import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const main = async (event) => {

  console.log("event", event);

  const body = JSON.parse(event.body);

  try {

    const { reservation_date, user_name } = body;

    const input = { 
      TableName:  process.env.DYNAMO_TABLE_NAME,
      Key: {
        "reservation_date": { 
          S: reservation_date
        },
        "user_name": {
          S: user_name
        }
      }
    };
    
    
    const command = new DeleteItemCommand(input);
    const response = await docClient.send(command);

    return { 
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true, 
      },
      body: JSON.stringify({ response })
    }

  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Credentials": true,
      },
      body: JSON.stringify({ message: `Error ${e.message}` }),

    }
  }

};

