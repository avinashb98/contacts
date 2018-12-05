const msg91 = require('msg91-promise');

// msg91 configurations
const msg91Key = process.env.MSG91_APIKEY;
const msg91Id = process.env.MSG91_ID;
const route = 4; // transactional route
const msg91SMS = msg91(msg91Key, msg91Id, route);

const send = async (number, content) => {
  try {
    await msg91SMS.send(number, content);
  } catch (error) {
    throw error;
  }
};

module.exports = { send };
