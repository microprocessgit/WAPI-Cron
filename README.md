# WAPI-Cron

## Requirements

- **NodeJS** version **14.5.0** or higher

## Installation

1. Download or clone this repo. If you want to skip the build step, you can download the prebuilt one (file with the `wapicron-VERSION.tgz` name pattern) from the release page
2. Enter to the project directory
3. Install the dependencies

```sh
npm install
```

## Setup

1. Copy the `.env.example` file and rename it into `.env`, then update your [connection url] in the `DATABASE_URL` field

## `.env` Configurations

```env
# Listening Host
HOST="localhost"

# Listening Port
PORT="3000"

# Database Connection URL
DATABASE_URL="mysql://root:12345@localhost:3306/baileys_api"

# Host WAPI
HOSTWAPI="http://0.0.0.0:3000"
```

## Usage

1. Make sure you have completed the **Installation** and **Setup** step
1. You can then start the app using the `start` script

```sh
npm run start
```