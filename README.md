# E-Lance Serverless Backend

## How to set up
1. Ensure Serverless is installed with `yarn global add serverless`
1. Install node packages with `yarn`
1. Set up the environmental variables
    * Create a file called `.env` in the root of the project.
    * Go to https://www.protectedtext.com/elance.env and copy its contents to `.env`.
1. Install the local DynamoDB with `sls dynamodb install`
1. Run serverless locally with `yarn start` or `yarn start:dev`
