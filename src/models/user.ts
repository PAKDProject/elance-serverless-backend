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
    email: string;
    fName: string;
    lName: string;
    dob: Date;
    summary: string;
    skills: Array<Skill>;
    educationItems: Array<EducationItem>;
    activeJobs: Array<Job>;
    jobHistory: Array<Job>;
    avatarUrl: string;
    backgroundUrl: string;
    socialLinks: Array<SocialLink>;
    tagline: string;
    contacts: Array<User>;
}

const UserRepo = typeDynamo.define(User, {
    tableName: 'users-table-dev',
    partitionKey: 'email'
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

export const findUserByEmail = async (email: string) => await UserRepo.find({email:email}).execute();

export const findUsersByFName = async (query: object) => await UserRepo.onIndex.fNameIndex.find(query).allResults().execute();

export const findUsersByLName = async (query: object) => await UserRepo.onIndex.lNameIndex.find(query).allResults().execute();

export const postNewUser = async (newUser: User) => await UserRepo.save(newUser).execute();

export const updateUser = async (email: string, userChanges: Partial<User>) => await UserRepo.update({email, ...userChanges}).execute();

export const deleteUser = async (email: string) => await UserRepo.delete({email:email}).execute();