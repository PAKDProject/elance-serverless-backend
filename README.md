# E-Lance Serverless Backend

## How to set up
1. Install node packages with `npm install`
1. Set up your AWS credentials
    1. Method 1 __*(Temporary)*__
        * Export your access token to the shell `export AWS_ACCESS_KEY_ID=<your-key-here>`
        * Export your secret token to the shell 
        ```
        export AWS_SECRET_ACCESS_KEY=<your-secret-key-here>
        ```
    1. Method 2 __*(Permanent)*__
        * Configure serverless cli to use your credentials 
        ```
        serverless config credentials --provider aws --key <your-key-here> --secret <your-secret-key-here>
        ```
1. Install the local DynamoDb with `sls dynamodb install`
1. Run serverless locally with `sls offline`
