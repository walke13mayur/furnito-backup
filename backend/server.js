const app = require("./app");

const connectDatabase = require("./config/database");

// Handling Uncaught Exception
// Errors causes due to using undeclered variable 
process.on("uncaughtException",(err)=>{
  console.log('Error:  ${err.message}');
  console.log('Shutting down the server due to uncaughtException');
  process.exit(1);

});


// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}


// Connecting to database
connectDatabase();


 const server = app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
  });


// Unhandeled Promise Rejection
process.on("unhandledRejection", (err)=>{
  console.log('Error:  ${err.message}');
  console.log('Shutting down the server due to Unhandelled Promise Rejection');

  server.close(()=>{
    process.exit(1);
  })
});
