import { DynamoDBClient, PutItemCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (event) => {

  console.log("event ==>", event)

  const body = JSON.parse(event.body);

  try { 

    const input = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Item: { 
        "reservation_date": {
          S: body.reservation_date
        },
        "guests": {
            S: body.guests
        },
      }
    };

    const putCommand = new PutItemCommand(input);
    const result = await docClient.send(putCommand);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: result }),
    };

  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify({ message: `Error ${e.message}` }),

    };
  }


};