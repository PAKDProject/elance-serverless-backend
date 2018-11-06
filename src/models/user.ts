import { typeDynamo } from "../lib/createDb";
import { Job } from "./job";

/**
 * Class for Skills
 */
class Skill {
    title: string;
    description: string;
}

/**
 * Class for Education Items
 */
class EducationItem {
    degreeTitle: string;
    startYear: string;
    endYear: string;
    collegeName: string;
    grade: string;
    description: string;
}

/**
 * Class for Social Links
 */
class SocialLink {
    name: string;
    linkUrl: string;
}

class User {
    id: string;
    email: string;
    fName: string;
    lName: string;
    phone: string;
    dob: Date;
    summary: string;
    skills: Skill[];
    educationItems: EducationItem[];
    activeJobs: Job[];
    jobHistory: Job[];
    avatarUrl: string;
    backgroundUrl: string;
    socialLinks: SocialLink[];
    tagline: string;
    contacts: String[];
}

const UserRepo = typeDynamo.define(User, {
    tableName: 'users-table-dev',
    partitionKey: 'id'
}).withGlobalIndex({
    indexName: 'fNameIndex',
    partitionKey: 'fName',
    projectionType: 'ALL'
}).withGlobalIndex({
    indexName: 'lNameIndex',
    partitionKey: 'lName',
    projectionType: 'ALL'
}).getInstance();

export const findAllUsers = async () => await UserRepo.find().allResults().execute();

export const findUserById = async (id: string) => await UserRepo.find({ id: id }).execute();

export const findUsersByFName = async (query: object) => await UserRepo.onIndex.fNameIndex.find(query).allResults().execute();

export const findUsersByLName = async (query: object) => await UserRepo.onIndex.lNameIndex.find(query).allResults().execute();

export const postNewUser = async (newUser: User) => await UserRepo.save(newUser).execute();

export const updateUser = async (id: string, userChanges: Partial<User>) => await UserRepo.update({ id, ...userChanges }).execute();

export const deleteUser = async (id: string) => await UserRepo.delete({ id: id }).execute();
