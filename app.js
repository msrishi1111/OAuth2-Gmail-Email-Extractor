import fs from 'fs/promises';
import { google } from 'googleapis';
import cheerio from 'cheerio';
// Load client secrets from credentials file
const credentials = {
  "web": {
    "client_id": "708849584972-qi90ppp6pn5ik96nbu1634vsrg6k.apps.googleusercontent.com",
    "project_id": "alien-topic-156908",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "GOCSPX-qgcXB1vEzPXXj9Qev9Q6RY1"
  }
}
;

// Create an OAuth2 client
const { client_secret, client_id } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, "");

// Set up the oAuth2Client and authenticate
oAuth2Client.setCredentials({
  access_token: '<put the access token got by running token.js , printend on terminal>',
  refresh_token: '<put the refresh token got by running token.js , printend on terminal>',
});

// Create Gmail API instance
const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

// Fetch conversations
const res = await gmail.users.threads.list({ userId: 'msrishi1111@gmail.com' });

const threads = res.data.threads;
// Prepare a text file for storing conversation data
for (const thread of threads) {
  const threadId = thread.id;
  let conversationText = '';
  const textFilePath = `data/thread_${threadId}.txt`;
  const response = await gmail.users.threads.get({ userId: 'msrishi1111@gmail.com', id: threadId });
  const messages = response.data.messages;

  for (const message of messages) {
    const msgData = message.payload.body.data;
    if (msgData) {
      const msgHtml = Buffer.from(msgData, 'base64').toString('utf-8');
      console.log(msgHtml)
      const textContent = extractTextFromHtml(msgHtml);
      conversationText += textContent + '\n';
    }
  }
  await fs.writeFile(textFilePath, conversationText);
}

function extractTextFromHtml(html) {
  const $ = cheerio.load(html);
  $('style, link[rel="stylesheet"]').remove();

  return $.text().trim();
}

console.log('Email conversations written to ' + textFilePath);





