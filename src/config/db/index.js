const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/cap1_infomation_users', {
      useNewUrlParser: true,
      useUniFiedTopology: true,
    });
    console.log('connect successfully!!!');
  } catch (error) {
    console.log('connect failure!!!');
  }
}

module.exports = { connect };
