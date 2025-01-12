import AWS from 'aws-sdk';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

export const handler = async (event) => {
  try {
    console.log("Event:", JSON.stringify(event, null, 2));

    // Parse request body
    // const { email, password } = JSON.parse(event.body);
    const requestBody = JSON.parse(event.body || '{}');
const email = requestBody.email;
const password = requestBody.password;

    if (!email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing email or password" }),
      };
    }

    console.log("Attempting login for email:", email);

    // Scan DynamoDB table to find matching email and password
    const params = {
      TableName: "Users",
      FilterExpression: "Email = :email AND Password = :password",
      ExpressionAttributeValues: {
        ":email": email,
        ":password": password,
      },
    };

    const data = await dynamoDB.scan(params).promise();
    console.log("Scan result:", JSON.stringify(data, null, 2));

    if (data.Items.length === 0) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid email or password" }),
      };
    }

    const user = data.Items[0];

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Login successful", user }),
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error logging in user",
        error: error.message,
      }),
    };
  }
};
