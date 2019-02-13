import { TableModel, findDocumentsByType, findDocumentById } from "../models/tableModel";

// Call first to get data
export async function assembleData(event:any, context: any) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById('420BLAZEITDAB4GSUS', 'user');
}
/*
    JOB HISTORY NODE
    Loops through the job history of the current user
    In each job it checks its tags and matches them to the tags on the jobs being processed
*/
export async function jobHistoryNode(event: any, context: any) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById('420BLAZEITDAB4GSUS', 'user');
    const userJobHistory = user.data.jobHistory;
    let inactiveJobTags = [];
    let jobHistoryTags= [];
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
        inactiveJobTags = [];
    });
}

/*
    USER SKILLS NODE
    Loops through the skills of the current user
    Matches each skill to the tags on the jobs being processed
*/
export async function userSkillsNode(event: any, context: any) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById('420BLAZEITDAB4GSUS', 'user');
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
export async function educationNode(event: any, context: any) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById('420BLAZEITDAB4GSUS', 'user');
    let educationItems = user.data.educationItems;
    let inactiveJobTags = [];
    user.data.educationItems.forEach(edu => {
        educationItems.push(edu);
    });
    inactiveJobs.forEach(job => {
        inactiveJobTags = job.tags;
    });
}

/*
    DESCRIPTION NODE
    Loops through the words in the user's description
    Matches each word to the tags on the jobs being processed
*/
export async function descriptionNode(event: any, context: any) {

}