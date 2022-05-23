# What you should know

This project use environement variables. You should add an extra file named ".env" to configure them. This file is not included in this repository.

# Clone

Go to the desired location of the project in your terminal then run the following command :

    git clone https://github.com/PaulThiberville/groupomania

# Install

In your terminal, navigate to the project folder then run the following commands :

    cd ../front
    npm install
    cd back
    npm install

Now you have to add the ".env" file in the back folder.

    DB_USERNAME=dbUsername
    DB_PASSWORD=dbPassword
    DB_DATABASE=dbDatabase
    ACCESS_TOKEN_SECRET=accessTokenSecret
    REFRESH_TOKEN_SECRET=refreshTokenSecret
    ADMIN_EMAIL=adminEmail
    ADMIN_PASSWORD=adminPassword

> This is an exemple of the ."env" file with placeholders

# Start

In the back folder, run the following commands

    npm start
    cd ../front
    npm start
