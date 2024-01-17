import AWS from 'aws-sdk';
import * as uuid from 'uuid';
import { APIGatewayProxyEvent } from 'aws-lambda';

import { Table } from 'sst/node/table';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export async function main(event: APIGatewayProxyEvent) {
    let data, params;

    // request body is passed in as json encoded str in 'event.body'
    if (event.body) {
        data = JSON.parse(event.body);
        params = {
            TableName: Table.Notes.tableName,
            Item: {
                // attributes of the item to be created
                userId: "369",
                noteId: uuid.v1(),
                content: data.content,
                attachment: data.attachment,
                createdAt: Date.now(),
            },
        };
    } else {
        return {
            statusCode: 404,
            body: JSON.stringify({ error: true }),
        };
    }

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify(params.Item),
        };
    } catch (error) {
        let message;
        if (error instanceof Error) {
            message = error.message;
        } else {
            message = String(error);
        }
        return {
            statusCode: 500,
            body: JSON.stringify({ error: message }),
        };
    }
}