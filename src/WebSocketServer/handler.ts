import { TableModel, findDocumentsByType, findDocumentById } from "../models/tableModel";

// Master function for neural network
export async function fuccMaster(event:any, context: any, callback: any, userId: string) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById(userId, 'user');
    let sortedJobs = [];
    sortedJobs.push(jobHistoryNode(inactiveJobs, user));
    userSkillsNode(inactiveJobs, user);
    educationNode(inactiveJobs, user);
    descriptionNode(inactiveJobs, user);
    const response = {
        status: 200,
        body: sortedJobs
    }
    callback(null, response);
}
/*
    JOB HISTORY NODE
    Loops through the job history of the current user
    In each job it checks its tags and matches them to the tags on the jobs being processed
*/
export async function jobHistoryNode(inactiveJobs: any[], user: any) {
    const userJobHistory = user.data.jobHistory;
    let inactiveJobTags = [];
    let jobHistoryTags= [];
    let jobPoints = [];
    userJobHistory.forEach(job => {
        job.tags.forEach(tag => {
            if(!jobHistoryTags.includes(tag)) {
                jobHistoryTags.push(tag);
            }
        });
    });
    inactiveJobs.forEach(job => {
        inactiveJobTags = job.tags;
        const commonTags = inactiveJobTags.filter(tag => jobHistoryTags.includes(tag));
        const points = commonTags.length * 20;
        jobPoints.push({
            id: job.id,
            points: points
        });
        inactiveJobTags = [];
    });
    return jobPoints;
}

/*
    USER SKILLS NODE
    Loops through the skills of the current user
    Matches each skill to the tags on the jobs being processed
*/
export async function userSkillsNode(inactiveJobs: any[], user: any) {
    let userSkills = [];
    let inactiveJobTags = [];
    user.data.skills.forEach(skill => {
        userSkills.push(skill.skillTitle);
    });
    inactiveJobs.forEach(job => {
        inactiveJobTags = job.tags;
        const commonTags = inactiveJobTags.filter(tag => userSkills.includes(tag));
        const points = commonTags.length * 20;
        inactiveJobTags = [];
    });
}

/*
    EDUCATION NODE
    Loops through the education items of the current user
    Matches each education item to the tags on the jobs being processed
*/
export async function educationNode(inactiveJobs: any[], user: any) {
    let educationItems = user.data.educationItems;
    let inactiveJobTags = [];
    inactiveJobs.forEach(job => {
        inactiveJobTags = job.tags;
        const commonTags = inactiveJobTags.filter(tag => educationItems.includes(tag));
        const points = commonTags.length * 20;
        inactiveJobTags = [];
    });
}

/*
    DESCRIPTION NODE
    Loops through the words in the user's description
    Matches each word to the tags on the jobs being processed
*/
export async function descriptionNode(inactiveJobs: any[], user: any) {

}