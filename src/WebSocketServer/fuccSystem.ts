import { findDocumentById, findDocumentsByType } from '../models/tableModel'
import { isNullOrUndefined } from 'util';

// Master function for neural network
export async function fuccMaster(id: string) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById(id, 'user');
    let sortedJobs = [];
    let pointsForJob = 0;
    inactiveJobs.forEach(async job => {
        pointsForJob += jobHistoryNode(job, user);
        pointsForJob += userSkillsNode(job, user);
        pointsForJob += educationNode(job, user);
        pointsForJob += summaryNode(job, user);
        sortedJobs.push({ job, pointsForJob });
        pointsForJob = 0;
    });
    sortedJobs.sort((a, b) => b.pointsForJob - a.pointsForJob);
    sortedJobs = sortedJobs.slice(0, 3)
    return sortedJobs
}

// FOR TESTING ONLY
// NO TOUCH! >:(
export async function fuccMasterTest(userId: string) {
    const allJobs = await findDocumentsByType('job');
    const inactiveJobs = allJobs.data.filter((job) => {
        return job.chosenApplicant === undefined;
    });
    const user = await findDocumentById(userId, 'user');
    let sortedJobs = [];
    let pointsForJob = 0;
    inactiveJobs.forEach(job => {
        pointsForJob += jobHistoryNode(job, user);
        pointsForJob += userSkillsNode(job, user);
        pointsForJob += educationNode(job, user);
        pointsForJob += summaryNode(job, user);
        sortedJobs.push({ job, pointsForJob });
        pointsForJob = 0;
    });
    sortedJobs.sort((a, b) => b.pointsForJob - a.pointsForJob);
    return {
        status: 200,
        body: sortedJobs
    }
}

/*
    JOB HISTORY NODE
    Loops through the job history of the current user
    In each job it checks its tags and matches them to the tags on the jobs being processed
*/
export function jobHistoryNode(inactiveJob: any, user: any): number {
    if (!isNullOrUndefined(user.data.jobHistory)) {
        const userJobHistory = user.data.jobHistory;
        let jobHistoryTags = [];
        userJobHistory.forEach(job => {
            if (!isNullOrUndefined(job.tags)) {
                job.tags.forEach(tag => {
                    if (!jobHistoryTags.includes(tag.skillTitle)) {
                        jobHistoryTags.push(tag.skillTitle);
                    }
                });
            }
        });
        const commonTags = inactiveJob.tags.filter(tag => jobHistoryTags.includes(tag.skillTitle));
        return commonTags.length * 20;
    } else {
        return 0;
    }
}

/*
    USER SKILLS NODE
    Loops through the skills of the current user
    Matches each skill to the tags on the jobs being processed
*/
export function userSkillsNode(inactiveJob: any, user: any): number {
    if (!isNullOrUndefined(user.data.skills)) {
        let userSkills = [];
        user.data.skills.forEach(skill => {
            userSkills.push(skill.skillTitle);
        });
        const commonTags = inactiveJob.tags.filter(tag => userSkills.includes(tag.skillTitle));
        return commonTags.length * 20;
    } else {
        return 0;
    }
}

/*
    EDUCATION NODE
    Loops through the education items of the current user
    Matches each education item to the tags on the jobs being processed
*/
export function educationNode(inactiveJob: any, user: any): number {
    if (!isNullOrUndefined(user.data.educationItems)) {
        let educationItems = user.data.educationItems;
        let commonTags = [];
        educationItems.forEach(edu => {
            if (!isNullOrUndefined(edu.description)) {
                const desc = edu.description.split(' ');
                const commonEdu = inactiveJob.tags.filter(tag => desc.includes(tag.skillTitle));
                commonEdu.forEach(tag => {
                    if (!commonTags.includes(tag)) {
                        commonTags.push(tag);
                    }
                });
            }
        });
        return commonTags.length * 20;
    } else {
        return 0;
    }
}

/*
    SUMMARY NODE
    Loops through the words in the user's summary
    Matches each word to the tags on the jobs being processed
*/
export function summaryNode(inactiveJob: any, user: any): number {
    if (!isNullOrUndefined(user.data.summary)) {
        let summary = user.data.summary.split(' ');
        const commonTags = inactiveJob.tags.filter(tag => summary.includes(tag.skillTitle));
        return commonTags.length * 20;
    } else {
        return 0;
    }
}