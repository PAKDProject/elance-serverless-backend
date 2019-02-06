import { TableModel } from '../models/tableModel';

export const ValidateUser = (user: TableModel) => {
    if (user.tagline.length > 50 || user.tagline === undefined) return false;
    else if (user.description.length > 300 || user.description === undefined) return false;
    user.educationItems.forEach(e => {
        if(e.degreeTitle==="" || e.degreeTitle===undefined) return false;
        else if(+e.startYear > +e.endYear) return false;
    });
    user.skills.forEach(s => {
        if(s.skillTitle==="" || s.skillTitle===undefined) return false;
    });
    user.socialLinks.forEach(s => {
        if(s.imageUrl==="" || s.url==="" || s.imageUrl===undefined) return false;
    });
    user.profileCards.forEach(c => {
        if(c.title==="" && c.type==="") return false;
    })
    return true;
}

export const ValidateJob = (job: TableModel) => {
    if(job.title === undefined || job.title==="" || job.title.length > 30) return false;

    return true;
}

export const ValidateOrg = (org: TableModel) => {
    return true;
}