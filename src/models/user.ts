import { typeDynamo } from "../lib/createDb";
import { Job } from "./job";

/**
 * Class for Skills
 */
class Skill {
    title?: string;
    description?: string;
}

/**
 * Class for Education Items
 */
class EducationItem {
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
class SocialLink {
    name?: string;
    linkUrl?: string;
}

export class User {
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
}

export const UserRepo = typeDynamo.define(User, {
    tableName: 'users-table-dev',
    partitionKey: 'email'
}).getInstance();

export const findAllUsers = async () => await UserRepo.find().allResults().execute();

export const postNewUser = async (newUser: User) => await UserRepo.save(newUser).execute();