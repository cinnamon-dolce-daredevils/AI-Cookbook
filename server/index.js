const db = require('./db/db');
const express = require('express');
const app = express();


const startServer = async () => {
  await db.sync();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
startServer();
