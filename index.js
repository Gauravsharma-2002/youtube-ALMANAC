require("dotenv").config();
const http = require("http");

const https = require("https");
const url = require("url");
const google = require("googleapis");
const crypto = require("crypto");
const express = require("express");
const session = require("express-session");
//to use oAuth we need clientId clientSecret redirecturi

const oauth2client = new google.Auth.OAuth2Client({
  client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
  client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL,
});

// define the scopes that are required
const scopes = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
// for trail making a global variable to store user Credential
// what exactly to do :
//  store user refresh token in dataBase

let userCredential = null;

async function main() {
  const app = express();
  app.use(
    session({
      secret: "abrakadabragiligilichu",
      resave: false,
      saveUninitialized: false,
    })
  );
  // making a redirecting uri
  app.get("/", async (req, res) => {
    // first generate a secure random state variable
    const state = crypto.randomBytes(32).toString("hex");
    // storing state in a session
    req.session.state = state;
    // make a url to ask permission for drive activity scope
    const authorizationUrl = oauth2client.generateAuthUrl({
      access_type: "offline", // "online is default " "offline(gets refresh token"
      // now have the scope thing in here
      // pass the scope array defined above
      // if have only one scope then it works with a single string to despite of a array
      scopes,
      // add an incremental authorization " recommened by google"
      include_granted_scopes: true,
      state,
    });
    res.redirect(authorizationUrl); // calling the function here
  });

  // recieve the callfrom google Oauth2 server
  app.get("/oauth2callback", async (req, res) => {
    // hadle the oauth server response here
    let q = url.parse(req.url, true).query;

    // if there is some error in it
    if (q.error) {
      // if access denied
      console.log("Error", q.error);
    } else if (q.state !== req.session.state) {
      // in this case the returned respose from the google server does not contains the same state i had sent to them , this must be error
      console.log("state mismatch . possible CSRF attack");
      res.end("state mismatched");
    } else {
      let { token } = await oauth2client.getToken(q.code);
      oauth2client.setCredentials(token);

      // now this token should be saved in global token thing // or for real life senerio- save- in -db
      // for now saving in global variable
      userCredential = token;

      //till here we were setting up the oauth now its time to do some fetching from drive
      const drive = google.drive("v3"); /// this create the access instance for the drive
      // now this drive needs some real data to do the required shit operation that "spiddy " wants
      drive.files.list(
        {
          // this guy wants the auth things
          auth: oauth2client,
          pageSize: 10,
          fields: "nextPageToken, files(id,name)",
        }, // now the next thing it wants is to handle the case if there is any error in there
        // that would be a callback
        // this callback either recieves a error or result
        (err1, res1) => {
          if (err1) {
            return console.log(
              "the mf google api returned the error inspite of some result",
              err1
            );
          }
          // or if we actually get some response
          const files = res1.data.files;
          if (files.length) {
            console.log(":Files: ");
            files.map((item, ind) => {
              console.log(`${item.name}(${item.id})`);
            });
          } else {
            console.log(`madharchod no files are there........`);
          }
        }
      );
    }
  });

  const server = http.createServer(app);
  server.listen(8080, () => {
    console.log(`server at port 8080`);
  });
}
main().catch(console.error);
