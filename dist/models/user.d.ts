import { Job } from "./job";
/**
 * Class for Skills
 */
export declare class Skill {
    title?: string;
    description?: string;
}
/**
 * Class for Education Items
 */
export declare class EducationItem {
    degreeTitle?: string;
    startYear?: string;
    endYear?: string;
    collegeName?: string;
    grade?: string;
    description?: string;
}
/**
 * Class for Social Links
 */
export declare class SocialLink {
    name?: string;
    linkUrl?: string;
}
/**
* Model class for User
* @extends AWS-SDK
*/
export declare class User {
    email?: string;
    fName?: string;
    lName?: string;
    dob?: Date;
    summary?: string;
    skills?: Array<Skill>;
    educationItems?: Array<EducationItem>;
    activeJobs?: Array<Job>;
    jobHistory?: Array<Job>;
    avatarUrl?: string;
    backgroundUrl?: string;
    socialLinks?: Array<SocialLink>;
    tagline?: string;
    contacts?: Array<User>;
    constructor(email?: string, fName?: string, lName?: string, dob?: Date, summary?: string, skills?: Skill[], educationItems?: EducationItem[], activeJobs?: Job[], jobHistory?: Job[], avatarUrl?: string, backgroundUrl?: string, socialLinks?: SocialLink[], tagline?: string, contacts?: User[]);
}
