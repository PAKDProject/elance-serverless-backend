# E-Lance Serverless Backend

## How to set up
1. **(Windows)** Ensure Java SDK is installed and on your PATH
   * Go to https://www.oracle.com/technetwork/java/javase/downloads/jdk11-downloads-5066655.html and download the sdk.
   * Go to **Control Panel**, then **System**, then **Advanced**, then **Environmental Variables**
   * Add the location of the **bin** folder of the Java SDK to your PATH
1. Ensure Serverless is installed with `yarn global add serverless`
1. Install node packages with `yarn`
1. Set up the environmental variables
    * Create a file called `.env` in the root of the project.
    * Go to https://www.protectedtext.com/elance.env and copy its contents to `.env`.
1. Configure serverless credentials
   * ` serverless config credentials --provider aws --key ACCESS_KEY --secret SECRET_KEY `
1. Install the local DynamoDB with `sls dynamodb install`
1. Run serverless locally with `yarn start` or `yarn start:dev`
