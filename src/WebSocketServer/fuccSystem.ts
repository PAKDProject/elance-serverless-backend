import { findDocumentById, findDocumentsByType } from '../models/tableModel'

// Master function for neural network
export async function fuccMaster(event: any, context: any) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById(event.pathParameters.id, 'user');
    let sortedJobs = [];
    let pointsForJob = 0;
    inactiveJobs.forEach(async job => {
        pointsForJob += await jobHistoryNode(job, user);
        pointsForJob += await userSkillsNode(job, user);
        pointsForJob += await educationNode(job, user);
        pointsForJob += await summaryNode(job, user);
        sortedJobs.push({ job, pointsForJob });
        pointsForJob = 0;
    });
    sortedJobs.sort((a, b) => a.pointsForJob - b.pointsForJob);
    return {
        status: 200,
        body: JSON.stringify(sortedJobs)
    }
}

/*
    JOB HISTORY NODE
    Loops through the job history of the current user
    In each job it checks its tags and matches them to the tags on the jobs being processed
*/
export async function jobHistoryNode(inactiveJob: any, user: any): Promise<number> {
    const userJobHistory = user.data.jobHistory;
    let jobHistoryTags = [];
    userJobHistory.forEach(job => {
        job.tags.forEach(tag => {
            if (!jobHistoryTags.includes(tag.skillTitle)) {
                jobHistoryTags.push(tag.skillTitle);
            }
        });
    });
    const commonTags = inactiveJob.tags.filter(tag => jobHistoryTags.includes(tag.skillTitle));
    return commonTags.length * 20;
}

/*
    USER SKILLS NODE
    Loops through the skills of the current user
    Matches each skill to the tags on the jobs being processed
*/
export async function userSkillsNode(inactiveJob: any, user: any): Promise<number> {
    let userSkills = [];
    user.data.skills.forEach(skill => {
        userSkills.push(skill.skillTitle);
    });
    const commonTags = inactiveJob.tags.filter(tag => userSkills.includes(tag.skillTitle));
    return commonTags.length * 20;
}

/*
    EDUCATION NODE
    Loops through the education items of the current user
    Matches each education item to the tags on the jobs being processed
*/
export async function educationNode(inactiveJob: any, user: any): Promise<number> {
    let educationItems = user.data.educationItems;
    let descriptions = [];
    educationItems.forEach(edu => {
        descriptions.push(edu.description);
    });
    const commonTags = inactiveJob.tags.filter(tag => descriptions.includes(tag.skillTitle));
    return commonTags.length * 20;
}

/*
    SUMMARY NODE
    Loops through the words in the user's summary
    Matches each word to the tags on the jobs being processed
*/
export async function summaryNode(inactiveJob: any, user: any): Promise<number> {
    let summary = user.data.summary;
    const commonTags = inactiveJob.tags.filter(tag => summary.includes(tag.skillTitle));
    return commonTags.length * 20;
}