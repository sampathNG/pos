require("dotenv").config({ path: __dirname + "/../.env" });
const { default: mongoose } = require("mongoose");
mongoose.set("strictQuery", false);
const dbConnect = () => {
  try {
    const conn = mongoose.connect(process.env.MONGODB_URL);
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("DAtabase error");
  }
};
module.exports = dbConnect;
