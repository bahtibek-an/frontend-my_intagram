// saveProfile.js

const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    const { data } = await axios.post('your_database_api_endpoint', JSON.parse(event.body));
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Data saved successfully', data }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
