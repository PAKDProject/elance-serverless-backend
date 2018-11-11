import { typeDynamo } from "../lib/createDb";

class TableModel {
    id: string;
    userId: string;
    userEmail: string;
    userFName: string;
    userLName: string;
    userPhone: string;
    userDOB: Date;
    userSummary: string;
    userSkills: Skill[];
    userEducationItems: EducationItem[];
    userActiveJobs: string[];
    userJobHistory: string[];
    userAvatarUrl: string;
    userBackgroundUrl: string;
    userSocialLinks: SocialLink[];
    userTagline: string;
    userContacts: String[];
    jobId: string;
    jobTitle: string;
    jobEmployer: string;
    jobDescription: string;
    jobDatePosted: Date;
    jobDateAccepted: Date;
    jobIsAccepted: boolean;
    jobPayment: number;
    jobProgress: number;
}

class Skill {
    title: string;
    description: string;
}

class EducationItem {
    degreeTitle: string;
    startYear: string;
    endYear: string;
    collegeName: string;
    grade: string;
    description: string;
}

class SocialLink {
    name: string;
    linkUrl: string;
}

export const AppTable = typeDynamo.define(TableModel, {
    tableName: 'app-table-dev',
    partitionKey: 'id',
}).withLocalIndex({
    indexName: 'jobIndex',
    partitionKey: 'id',
    sortKey: 'jobId',
    projectionType: 'INCLUDE',
    attributes: ['jobTitle','jobEmployer','jobDescription','jobPayment']
}).withGlobalIndex({
    indexName: 'userJobIndex',
    partitionKey: 'userId',
    sortKey: 'jobId',
    projectionType: 'ALL'
}).getInstance();

export const findAllUsers = async () => await AppTable.find().allResults().execute();
