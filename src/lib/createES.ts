import { Client } from "elasticsearch";

//export let elasticSearch = new Client({ host: process.env.ES_CLUSTER })
export let elasticSearch = new Client({ host: "https://search-elance-search-domain-34b3cakfsla5m7jglpdl2legui.eu-west-1.es.amazonaws.com/" })