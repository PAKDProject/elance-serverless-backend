import { typeDynamo } from "../lib/createDb";

export class Job {
    id: string;
    title: string;
    employer: string;
    description: string;
    datePosted: Date;
    dateAccepted: Date;
    isAccepted: boolean;
    payment: number;
    progress: number;
    location: string;
}

const JobRepo = typeDynamo.define(Job, {
    tableName: 'jobs-table-dev',
    partitionKey: 'id'
}).withGlobalIndex({
    indexName: 'titleIndex',
    partitionKey: 'title',
    projectionType: 'ALL'
}).withGlobalIndex({
    indexName: 'paymentIndex',
    partitionKey: 'payment',
    projectionType: 'ALL'
}).getInstance();

export const findAllJobs = async () => await JobRepo.find().allResults().execute();

export const findJobById = async (id: string) => await JobRepo.find({id:id}).execute();

export const findJobByTitle = async (query: object) => await JobRepo.onIndex.titleIndex.find(query).allResults().execute();

export const findJobByPayment = async (query: object) => await JobRepo.onIndex.paymentIndex.find(query).allResults().execute();

export const postNewJob = async (newJob: Job) => await JobRepo.save(newJob).execute();

export const updateJob = async (id: string, jobChanges: Partial<Job>) => await JobRepo.update({id, ...jobChanges}).execute();

export const deleteJob = async (id: string) => await JobRepo.delete({id:id}).execute();

