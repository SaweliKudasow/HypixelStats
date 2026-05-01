# HypixelStats

A small web app that looks up Minecraft player info via the Mojang API and Hypixel API (rank, network level, online status, and Hypixel player count).

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS recommended)
- A [Hypixel API key](https://developer.hypixel.net/) (requires a Hypixel-linked Minecraft account)

## Setup

1. **Clone the repository** (or download the project).

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Add your Hypixel API key** in a file named `token.json` in the project root:

   ```json
   { "token": "your-hypixel-api-key-here" }
   ```

   This file is listed in `.gitignore` so it is not committed. Do not share your key publicly.

## Run

Start the server:

```bash
npm start
```

Or:

```bash
node server.js
```

Open **http://localhost:3000** in your browser.

## Usage

Enter a Minecraft username in the UI and submit to fetch profile data from Hypixel.

## Troubleshooting

- **500 errors or API failures:** Check that `token.json` exists, is valid JSON, and contains a working Hypixel API key.
- **Port in use:** The app listens on port `3000` by default. Change `port` in `server.js` if needed.
