import { Client } from "elasticsearch";

export let elasticSearch = new Client({ host: process.env.ES_CLUSTER })