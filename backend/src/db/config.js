// getting-started.js
const mongoose = require("mongoose");

async function main() {
  return await mongoose.connect(process.env.MONGO_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
mongoose.connection.on("error", (e) => {
  console.log("Connection failed: Error");
});

mongoose.connection.once("open", () => {
  console.log("MongoDB Atlas connected");
});

module.exports = main();
