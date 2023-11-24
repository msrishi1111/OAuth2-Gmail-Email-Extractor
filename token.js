import express from 'express';
import open from 'open';
import { google } from 'googleapis';


const app = express();

// OAuth 2.0 client credentials from Google Cloud Console
const CLIENT_ID = '708849584972-qi90ppp6pntthi5ik96nbu1634vsrg6k.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'http://localhost:3000/oauth2callback';
const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];

// Create an OAuth2 client
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

// Generate the URL for the OAuth2 consent screen
const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
});

// Route to initiate the OAuth flow
app.get('/auth', (req, res) => {
  res.redirect(authUrl);
});

// Route to handle the OAuth callback
app.get('/oauth2callback', async (req, res) => {
  const code = req.query.code;

  try {
    // Exchange the authorization code for tokens
    const { tokens } = await oAuth2Client.getToken(code);
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    res.send('Authorization successful');
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error during authorization');
  }
});

const server = app.listen(3000, () => {
  console.log('Server is running on port 3000');
  // Automatically open the browser to start the OAuth flow
  open(authUrl);
});

// Close the server gracefully when process is terminated
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
