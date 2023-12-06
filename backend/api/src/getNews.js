require('dotenv').config();
const {
    DynamoDBClient,
    ScanCommand,
} = require('@aws-sdk/client-dynamodb');
//const { fromEnv } = require('@aws-sdk/credential-providers');

// Initialize the DynamoDB client
const dynamoDBClient = new DynamoDBClient({
    region: 'us-west-2'
    //, credentials: fromEnv()
});

// Your DynamoDB table name
const tableName = process.env.AWS_DYNAMODB_TABLE_NAME || 'news';

async function getNews () {
    try {
        const params = {
            TableName: tableName,            
            IndexName: 'scrape_date',
            ScanIndexForward: false
        };  

        const scanCommand = new ScanCommand(params);
        const data = await dynamoDBClient.send(scanCommand);
        console.log('success');
        return { statusCode: 200, body: data.Items };
    } catch (error) {
        console.log('error trying to get news: ' + error);
        return { statusCode: 500, body: [] };
    }
}

module.exports = {
    getNews,
};
