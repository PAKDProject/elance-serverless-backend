import { typeDynamo } from "../lib/createDb";

export class TableModel {
  // Partition and sort key
  id: string;
  entity: string;
  // User related attributes
  email: string;
  fName: string;
  lName: string;
  // fullName: string;
  phone: string;
  dob: Date;
  summary: string;
  educationItems: EducationItem[];
  skills: ISkills[];
  appliedJobs: object[];
  activeJobs: object[];
  jobHistory: string[];
  avatarUrl: string;
  backgroundUrl: string;
  socialLinks: SocialLink[];
  tagline: string;
  contacts: String[];
  profileCards: IProfileCard[];
  // Job related attributes
  title: string;
  employerID: string;
  employerName: string;
  location: string;
  remote: boolean;
  description: string;
  datePosted: Date;
  payment: number;
  applicants: object[];
  chosenApplicant: object;
  dateAccepted: Date;
  dateCompleted: Date;
  dateDue: Date;
  progress: number;
  // Token related attributes
  cognitoId: string;
  refresh_token: string;
  // Blacklisted token related fields
  blacklistedTokens: IBlacklistToken[];
  userId: string;
  token: string;
  expiryDate: number;
}

interface ISkills {
  skillTitle: string;
  category?: string;
  confidenceLevel?: string;
}

interface EducationItem {
  degreeTitle: string;
  startYear: string;
  endYear: string;
  collegeName: string;
  grade: string;
  description: string;
}

interface SocialLink {
  name: string;
  linkUrl: string;
}

interface IProfileCard {
  title: string;
  type: string;
  content: string | ISkills[] | EducationItem[];
}

export interface IBlacklistToken {
  userId: string;
  token: string;
  expiryDate: number;
}

const AppTable = typeDynamo
  .define(TableModel, {
    tableName: "app-table-dev",
    partitionKey: "id",
    sortKey: "entity"
  })
  .withGlobalIndex({
    indexName: "entityIndex",
    partitionKey: "entity",
    projectionType: "ALL"
  })
  .getInstance();

export const findAllDocuments = async () => await AppTable.find().allResults().execute();

export const findDocumentsByType = async (entity: string) => await AppTable.onIndex.entityIndex.find({ entity }).allResults().execute();

export const findDocumentById = async (id: string, entity: string) => await AppTable.find({ id, entity }).execute();

export const batchFindDocumentsByIds = async ( idBatch: string[], entity: string ) => await AppTable.find(idBatch.map(id => ({ id, entity }))).execute();

export const createNewDocument = async (newEntry: TableModel) => await AppTable.save(newEntry).execute();

export const updateDocument = async ( id: string, entity: string, changes: TableModel ) => await AppTable.update({ id, entity }, changes).execute();

export const deleteDocument = async (id: string, entity: string) => await AppTable.delete({ id, entity }).execute();