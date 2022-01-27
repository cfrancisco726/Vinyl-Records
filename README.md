A content management system that allows users to purchase records. An admin panel allows the site owner to add, edit, or delete inventory on the website.

Built with: React-Redux, MongoDB, ExpressJS, NodeJS and React-Boostrap.

# Vinyl-Records

A content management system that allows users to purchase records. An admin panel allows the site owner to add, edit, or delete inventory on the website.

Live demo [_here_](https://destination-finder.herokuapp.com/)

> Since it is hosted on heroku the initial load time may lag. Currently there are issues connecting to MongoDB atlas so trips at the moment can't be saved. Previous working database was connected to mLab. There have been changes to the API so the search function may not return results on every destination anymore.

## Description

- React App that connects to a NodeJS and Express backend. Communicates data with Mongo Atlas database.
- Admin section to set record price, image, name and

## Technologies Used

- React
- Redux
- MongodDB
- NodeJS
- ExpressJS
- React-Boostrap

## Features

- Material UI form with error handling. Submits a request to Amadeus API for flight information.
- Google Maps plots flight data.
- Flights can be saved to saved flights page.

## Landing page with form and google map

![Example screenshot](./client/src/images/wanderlust.png)

## 🛠️ Installation Steps

Install dependencies

```bash
npm install
```

Use node version 9.7.1

```bash
nvm use 9.7.1
```

### Executing program

Running the following script runs several other scripts: "concurrently \"npm run client\" \"npm run server\"",

```
npm run dev
```

## Contact

Created by [@cfrancisco726](http://www.carlofrancisco.com) - feel free to contact me!
