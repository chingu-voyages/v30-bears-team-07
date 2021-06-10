# Resto-Fund

<hr/>

## Table of Contents

- [Overview](https://github.com/chingu-voyages/v30-bears-team-07#overview)
- [Features](https://github.com/chingu-voyages/v30-bears-team-07#features)
- [Technologies Used](https://github.com/chingu-voyages/v30-bears-team-07#technologies-used)
- [Installation](https://github.com/chingu-voyages/v30-bears-team-07#installation)
  - [Back-end](https://github.com/chingu-voyages/v30-bears-team-07#backend)
    - [MongoDB Atlas Setup](https://github.com/chingu-voyages/v30-bears-team-07#mongodb-atlas-setup)
  - [Front-end](https://github.com/chingu-voyages/v30-bears-team-07#frontend)
- [Dependencies](https://github.com/chingu-voyages/v30-bears-team-07#dependencies)
- [License](https://github.com/chingu-voyages/v30-bears-team-07#license)

<hr>

## Overview

Crowd-funding web application, specialized for helping restaurants collect donations to
survive lockdowns, created using React.js, Node.js, Express, MongoDB, Sass, Google OAuth, Stripe API.

<b>LIVE LINK:</b> https://

<hr/>

### Features

<br/>
User Authentication
<ul>
    <li>Login</li>
    <li>Login via Google</li>
</ul>
Main Features
<ul>
    <li>Create Project</li>
    <li>Edit Project</li>
    <li>Delete Project</li>
    <li>Donate to a Project</li>
</ul>

<hr>

### Technologies Used

<br>

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Redux" src="https://img.shields.io/badge/redux-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="SASS" src="https://img.shields.io/badge/SASS-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> <img alt="HTML5" src="https://img.shields.io/badge/html5-%23E34F26.svg?&style=for-the-badge&logo=html5&logoColor=white"/>

<ul>
    <li>Stripe</li>
    <li>Heroku</li>
</ul>

<hr>

## Installation

Clone this project locally and then follow the instructions below:

### Backend

To start the backend server, go to the server folder:

```bash
cd server
```

Install dependencies by running:

```bash
npm install
```

Then, start the project's server in development mode on port 5000 by running:

```bash
npm run dev
```

The application requires an .env file which contains the following keys:

- MONGODBNAME
- MONGOPASS
- JSON WEB TOKENS SECRETKEY
- STRIPE SECRETKEY
- STRIPE ENDPOINT SECRET
- GOOGLE AUTH CLIENT ID

The SECRETKEY is used for JWT auth tokens.

To run the server, one must make an account for both MongoDB Atlas:

Registration instructions for both sites can be found in:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

<hr>

#### MongoDB Atlas Setup

After creating an account, click `New Project` and follow the instructions.

After creating a project, click `Build a Cluster` and follow the instructions for free tier.

After creating a cluster, go to `COLLECTIONS` and then choose `Add My Own Data` to create a new database for the server to use.

After creating a database, click `CONNECT`, follow the instructions, choose `Connect your application` as the connection method, and then retrieve the following information to put on the .env file:

- MONGODBNAME
- MONGOPASS

<hr>

<hr>

### Frontend

To start the client-side application, go to the client folder:

```bash
cd client
```

Install dependencies by running:

```bash
npm install
```

Start the client application in development mode on port 5000 by running:

```bash
npm start
```

To run the build process:

```bash
npm run build
```

<hr>

<hr>

## Dependencies

Server

<ul>
    <li>async: ^3.2.0</li>
    <li>axios: ^0.21.1</li>
    <li>axios: ^0.21.1</li>
    <li>bcryptjs: ^2.4.3</li>
    <li>body-parser: ^1.19.0</li>
    <li>body-parser: ^1.19.0</li>
    <li>concurrently: ^6.1.0</li>
    <li>cors: ^2.8.5</li>
    <li>date-fns: ^2.21.3</li>
    <li>dotenv: ^9.0.1</li>
    <li>express: ^4.17.1</li>
    <li>helmet: ^3.15.1</li>
    <li>http-errors: ~1.6.2</li>
    <li>jsonwebtoken: ^8.5.1</li>
    <li>mongodb: ^3.6.6</li>
    <li>mongoose: ^5.12.7</li>
    <li>mongoose-friends: ^0.2.5</li>
    <li>morgan: ^1.10.0</li>
    <li>nocache: ^2.1.0</li>
    <li>passport-http: ^0.3.0</li>
    <li>passport-jwt: ^4.0.0</li>
    <li>passport-local: ^1.0.0</li>
    <li>socket.io: ^2.4.1</li>
    <li>stripe": ^8.150.0</li>

</ul>
Server Dev Dependencies:
<ul>
    <li>nodemon: ^2.0.7</li>
    <li>prettier: 2.3.0</li>
</ul>

Client:

<ul>
    <li>@stripe/stripe-js: ^1.15.0</li>
    <li>@testing-library/jest-dom: ^5.11.4</li>
    <li>@testing-library/react: ^11.1.0</li>
    <li>@testing-library/user-event: ^12.1.10</li>
    <li>node-sass: ^4.14.1</li>
    <li>react: ^17.0.2</li>
    <li>react-dom: ^17.0.2</li>
    <li>react-redux: ^7.2.4</li>
    <li>react-router-dom: ^5.2.0</li>
    <li>react-scripts: ^4.0.3</li>
    <li>react-toastify: ^7.0.4</li>
    <li>redux-form: ^8.3.7</li>
    <li>redux-thunk: ^2.3.0</li>
    <li>stripe: ^8.150.0</li>
    <li>web-vitals: ^1.0.1</li>
</ul>
<br>

<hr>

## License

[MIT](https://choosealicense.com/licenses/mit/)
