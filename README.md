# What you should know

This project use environement variables. You should add an extra file named ".env" to configure them. This file is not included in this repository.

# Clone

Go to the desired location of the project in your terminal then run the following command :

    git clone https://github.com/PaulThiberville/groupomania

# Installation

In your terminal, navigate to the project folder then run the following commands :

    cd front
    npm install
    cd ../back
    npm install

# Configuration

Add the ".env" file in the back folder.

    DB_USERNAME=dbUsername
    DB_PASSWORD=dbPassword
    DB_DATABASE=dbDatabase
    ACCESS_TOKEN_SECRET=accessTokenSecret
    REFRESH_TOKEN_SECRET=refreshTokenSecret
    ADMIN_EMAIL=adminEmail
    ADMIN_PASSWORD=adminPassword

> This is an exemple of the ."env" file with placeholders

Change DB_USERNAME , DB_PASSWORD, and DB_DATABASE to connect a mySQL Database.

Run the following command two times in your terminal. And paste the two values to ACCES_TOKEN_SECRET and REFRESH_TOKEN_SECRET.

    node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"

The final step is to define ADMIN_EMAIL and ADMIN_PASSWORD with desired values.

# Start

In the back folder, run the following commands

    npm start
    cd ../front
    npm start
