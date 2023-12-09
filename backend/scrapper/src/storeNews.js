require('dotenv').config();
const {
    DynamoDBClient,
    BatchWriteItemCommand,
} = require('@aws-sdk/client-dynamodb');
//const { fromEnv } = require('@aws-sdk/credential-providers');

// Initialize the DynamoDB client
const dynamoDBClient = new DynamoDBClient({
    region: 'us-west-2',
    //, credentials: fromEnv()
});

// Your DynamoDB table name
const tableName = process.env.AWS_DYNAMODB_TABLE_NAME || 'news';

async function storeNews(news) {
    const params = {
        RequestItems: {
            [tableName]: [],
        },
    };

    news.data.forEach((item) => {
        params.RequestItems[tableName].push({
            PutRequest: {
                Item: {
                    link: { S: item.link },
                    subject: { S: news.subject },
                    title: { S: item.title },
                    website: { S: news.website },
                    scrape_date: { S: item.scrape_date },
                    expire_date: { N: `${item.expire_date}` }
                },
            },
        });
    });

    try {
        const batchWriteCommand = new BatchWriteItemCommand(params);
        await dynamoDBClient.send(batchWriteCommand);
        console.log('success');
    } catch (error) {
        console.log('error trying to store news: ' + error);
    }
}

module.exports = {
    storeNews,
};
