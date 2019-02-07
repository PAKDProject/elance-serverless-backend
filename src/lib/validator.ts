import { TableModel } from '../models/tableModel';
import { isNullOrUndefined } from 'util';

export const ValidateUser = (user: TableModel) => {
    if (user.tagline.length > 50 || user.tagline === undefined) return false;
    else if (user.description.length > 300 || user.description === undefined) return false;
    user.educationItems.forEach(e => {
        if(isNullOrUndefined(e.degreeTitle)) return false;
        else if(+e.startYear > +e.endYear) return false;
    });
    user.skills.forEach(s => {
        if(isNullOrUndefined(s.skillTitle)) return false;
    });
    user.socialLinks.forEach(s => {
        if(isNullOrUndefined(s.imageUrl) || isNullOrUndefined(s.url) || s.imageUrl===undefined) return false;
    });
    user.profileCards.forEach(c => {
        if(isNullOrUndefined(c.title) && isNullOrUndefined(c.type)) return false;
    })
    return true;
}

export const ValidateJob = (job: TableModel) => {
    if(isNullOrUndefined(job.title) || job.title.length > 30) return false;
    else if(isNullOrUndefined(job.employerName) || job.employerName.length > 50) return false;
    else if(isNullOrUndefined(job.description) || job.description.length > 500) return false;
    else if (isNullOrUndefined(job.payment)) return false;
    return true;
}

export const ValidateOrg = (org: TableModel) => {
    if(isNullOrUndefined(org.title) || org.title.length > 40) return false;
    else if(isNullOrUndefined(org.email) || org.email.length > 50) return false;
    else if(org.description.length > 500) return false;
    else if (org.websiteUrl.length > 100) return false;
    return true;
}