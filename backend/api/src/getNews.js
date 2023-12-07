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
            TableName: tableName
        };  

        const scanCommand = new ScanCommand(params);
        const data = await dynamoDBClient.send(scanCommand);
        const orderedData = orderData(data.Items);

        console.log('success');
        return { 
            statusCode: 200, 
            body: data.Items, 
            headers: {
                'ETag': `"${orderedData[0].scrape_date.S}"`,
            }, 
        };
    } catch (error) {
        console.log('error trying to get news: ' + error);
        return { statusCode: 500, body: [] };
    }
}

function orderData(items) {
    const sortedItems = items.sort((a, b) => {
        const aDate = new Date(a.scrape_date.S);
        const bDate = new Date(b.scrape_date.S);
      
        return bDate - aDate;
    });

    return sortedItems;
}

module.exports = {
    getNews,
};
