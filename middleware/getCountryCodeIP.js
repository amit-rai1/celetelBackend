const axios = require('axios');

const apiKey = 'bc43fa4a1bcb8341088b0e592dabfb3c'; 

async function getCountryCodeByIP(ip) {
  try {
    const response = await axios.get(`http://api.ipstack.com/${ip}?access_key=${apiKey}`);
    console.log(response.data,"code");
    return response.data.country_code;
  } catch (error) {
    console.error('Error in getCountryCodeByIP:', error);
    throw error;
  }
}

module.exports = { getCountryCodeByIP };
