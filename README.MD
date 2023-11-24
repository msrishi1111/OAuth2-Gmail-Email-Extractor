## OAuth2-Gmail-Email-Extractor

This repository contains scripts to extract Gmail conversations using the Gmail API and Node.js.

### Prerequisites

- Node.js installed
- Google Cloud Console project with Gmail API enabled

### Steps to Get OAuth 2.0 Client Credentials from Google Cloud Console

1. **Visit the Google Cloud Console:** Go to the [Google Cloud Console](https://console.cloud.google.com/).

2. **Create a Project (if necessary):** If you don’t have an existing project, create a new project by clicking on the project drop-down menu at the top of the page and selecting "New Project." Follow the prompts to set up your project.

3. **Navigate to the API & Services Dashboard:** In the Cloud Console, select the created or existing project. Then, navigate to the "APIs & Services" > "Dashboard" from the left-hand menu.

4. **Enable the Gmail API:** Click on the "Enable APIs and Services" button. Search for "Gmail API" and select it from the results. Click the "Enable" button to enable the Gmail API for your project.

5. **Create OAuth 2.0 Client ID:**
   - Navigate to "APIs & Services" > "Credentials."
   - Click on the "Create Credentials" drop-down and select "OAuth client ID."
   - Choose the application type (e.g., Web Application, Other, etc.).
   - Configure the authorized redirect URIs if needed. For development purposes, you can use `http://localhost:3000/oauth2callback`.
   - Click "Create" to generate your OAuth 2.0 credentials.

6. **Obtain Client ID and Client Secret:** Once created, you'll be presented with the Client ID and Client Secret. Copy these values and use them in your `token.js` and `app.js` scripts accordingly.

7. **Configure Authorized Redirect URIs:**
   Ensure that the authorized redirect URIs in your OAuth consent screen (from the Credentials page) match the redirect URIs used in your `token.js` script. This is important for the OAuth flow to work correctly.

### Usage

#### Token.js
- This script initiates the OAuth flow to get access and refresh tokens.
- Replace `CLIENT_ID`, `CLIENT_SECRET`, and `REDIRECT_URI` in the script with your obtained credentials.
- Run the script using `node token.js` and follow the authorization steps in the browser.

#### App.js
- This script fetches Gmail conversations and stores them as text files.
- Ensure you've completed the OAuth flow and obtained access tokens before running this script.
- Modify the necessary variables (like `userId`) in the script according to your requirements.
- Run the script using `node app.js` to extract Gmail conversations.

### Notes
- Ensure Node.js is properly configured and dependencies are installed (`npm install`).
- Follow the steps carefully to obtain OAuth 2.0 client credentials for accessing the Gmail API.