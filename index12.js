const url = require("url");
const cors = require("cors");
const google = require("googleapis");
const http = require("http");
const crypto = require("crypto");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const { error } = require("console");
require("dotenv").config();
// console.log(process.env);

const oAuth2Client = new google.Auth.OAuth2Client(
  process.env.GOOGLE_OAUTH_CLIENT_ID,
  process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URL
);

const scope = ["https://www.googleapis.com/auth/drive.metadata.readonly"];

let userCredential = null;
async function main() {
  const app = express();
  app.use(cookieParser());
  app.use(
    cors({
      origin: "*",
      extended: true,
    })
  );
  app.use(
    session({
      secret: process.env.GOOGLE_CONSOLE_API,
      resave: false,
      saveUninitialized: false,
    })
  );
  // end of use

  //redirects
  // 1. google auth server redirect
  app.get("/", async (req, res) => {
    // Generate a secure random state value.
    const state = crypto.randomBytes(32).toString("hex");
    // Store state in the session
    req.session.state = state;

    // Generate a url that asks permissions for the Drive activity scope
    const authorizationUrl = oAuth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: "offline",
      /** Pass in the scopes array defined above.
       * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
      scope: scope,
      // Enable incremental authorization. Recommended as a best practice.
      include_granted_scopes: true,
      // Include the state parameter to reduce the risk of CSRF attacks.
      state: state,
    });

    res.redirect(authorizationUrl);
  });
  //   const server = http.createServer(8000, () => {
  //     console.log(`server at port 8000`);
  //   });

  //
  app.get("/oauth2callback", async (req, res) => {
    // Handle the OAuth 2.0 server response
    let q = url.parse(req.url, true).query;

    if (q.error) {
      // An error response e.g. error=access_denied
      console.log("Error:" + q.error);
    } else if (q.state !== req.session.state) {
      //check state value
      console.log("State mismatch. Possible CSRF attack");
      res.end("State mismatch. Possible CSRF attack");
    } else {
      // Get access and refresh tokens (if access_type is offline)
      let { tokens } = await oAuth2Client.getToken(q.code);
      oAuth2Client.setCredentials(tokens);

      /** Save credential to the global variable in case access token was refreshed.
       * ACTION ITEM: In a production app, you likely want to save the refresh token
       *              in a secure persistent database instead. */
      userCredential = tokens;

      // Example of using Google Drive API to list filenames in user's Drive.
      const drive = google.drive("v3");
      drive.files.list(
        {
          auth: oAuth2Client,
          pageSize: 10,
          fields: "nextPageToken, files(id, name)",
        },
        (err1, res1) => {
          if (err1) return console.log("The API returned an error: " + err1);
          const files = res1.data.files;
          if (files.length) {
            console.log("Files:");
            files.map((file) => {
              console.log(`${file.name} (${file.id})`);
            });
          } else {
            console.log("No files found.");
          }
        }
      );
    }
  });
  //   app.get("/api/googlesolution", async (req, res) => {

  //     const drive = google.drive("v3");
  //     drive.files.list(
  //       {
  //         auth: oAuth2Client,
  //         pageSize: 10,
  //         fields: "nextPageToken, files(id, name)",
  //       },
  //       (err1, res1) => {
  //         if (err1) return console.log("The API returned an error: " + err1);
  //         const files = res1.data.files;
  //         if (files.length) {
  //           console.log("Files:");
  //           files.map((file) => {
  //             console.log(`${file.name} (${file.id})`);
  //           });
  //         } else {
  //           console.log("No files found.");
  //         }
  //       }
  //     );
  //   });
  const server = http.createServer(app);
  server.listen(8000, () => {
    console.log(`server at 8080`);
  });
}

main().catch((e) => {
  console.log(e);
});
