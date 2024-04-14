import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
const ses = new SESClient({ region: "us-east-1" });

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler = async(event) => {
  const { name, phone, email, firstName, lastName } = JSON.parse(event.body);

  // DynamoDB
  const tableName = "UserEmailList";
  const dbCommand = new PutCommand({
    TableName: tableName,
    Item: {
      id: '23456',
      mName: name,
      mPhone: phone,
      mEmail: email,
      fName: firstName,
      lName: lastName
    }
  })
  const response = await docClient.send(dbCommand);
  console.log("DynamoDB response: " + response);

  
// SES 
const htmlBody = `
    <html>
        <body>
            <h1 style="font-family: Arial, sans-serif; color: #007bff;">Welcome ${firstName} ${lastName}!</h1>
            <p style="font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">We're thrilled that you're downloading our report. We hope you find it insightful and valuable.</p>
            <p style="font-family: Arial, sans-serif; font-size: 16px; margin-bottom: 20px;">Here is your <a target="_blank" 
                href="https://host-marketing-freebie-1234567890.s3.amazonaws.com/digital-marketing-freebie.pdf" 
                style="color: #007bff; text-decoration: none; font-weight: bold;">report</a>.
            </p>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1Fte7JGPCJWOblGTkCPAhAHuC2A5rOxSG1w&usqp=CAU" style="width: 600px; height: 400px; margin-top: 20px;">
        </body>
    </html>
`;

  const command = new SendEmailCommand({
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: { 
            Data: `Welcome ${firstName} ${lastName}!` 
        },
        Html: {
          Charset: 'UTF-8',
          Data: htmlBody
        },
      },

      Subject: { Data: "Test Email:" },
    },
    Source: "adamsawyer391@gmail.com",
  });

  try {
    let response = await ses.send(command);
    // process data.

    // response to client
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email sent successfully: ' + email})
    };

  }
  catch (error) {
    // error handling.
  }
  finally {
    // finally.
  }
};

