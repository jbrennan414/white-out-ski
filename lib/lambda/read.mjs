import { DynamoDBClient, ScanCommand, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (event) => {

  console.log("event", event);

  try {
  
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
    };

    const scanCommand = new ScanCommand(params);
    const result = await docClient.send(scanCommand);

    const items = result.Items.map((item) => unmarshall(item));
      
    return {
      statusCode:200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials": true, // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(items)
    };

  } catch (e) {
    console.log("we hit an error", e);

  }
}
