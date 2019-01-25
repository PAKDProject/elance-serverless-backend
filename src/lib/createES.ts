import { Client } from "elasticsearch";

export const client = new Client({
    host: 'https://search-elance-doc-domain-nb654npbg5hpm6e5lmwpx6obhy.eu-west-1.es.amazonaws.com',
    log: 'trace'
})