const mongoose = require("mongoose");
require("dotenv").config();

const conectarDb = async () => {
  try {
    mongoose.set("useCreateIndex", true);
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    });
    console.log(`Db conectada en ${process.env.DB_MONGO}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = conectarDb;
