# ENPICOM Software Engineer Technical Assessment

## Brief

Hello there! If you have been asked to complete this technical assessment, that means we
believe you are a promising candidate for one of our open vacancies.

We have provided you with a working template project, to save some time.
Of course if you prefer, feel free to delete the files and start from scratch.

You might have to make assumptions about the requirements, please write them down.
Please fork this repository, push your implementation and provide us with the link when you're finished.

Here's what we would like you to do:

### Server

Design and implement a REST API in TypeScript that exposes 2 endpoints:

- ✅ Adding a DNA string (DNA strings consist of `ACTG` letters)
- ✅ Searching for DNA strings, allowing an ✅ optional parameter for [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between search and match.

✅ Both endpoints should validate their inputs. ✅ Both endpoints should also be tested.
✅ Data should be persisted in a PostgreSQL database.

### Client

✅ Design and implement a SPA in TypeScript + React that allows a user to interact with the above API
through their browser.

## Result

In this repo you find the implementation of the above brief. It is a DNA browser which easily allows you to search DNA strings and add them when they do not exist in the database:
![dna browser](./images/screenshot.png)

### How to run

1. `docker-compose up`
2. Wait some time (react-scripts is far from optimized, especially in dev)
3. Go to http://localhost:3000/

### Run Tests for the React frontend

1. `cd ./client/`
2. `yarn test`

NOTE: This command currently just spawns the db and server docker containers to make the api available. In the future, API calls can best be mocked.

### Run Tests for the NodeJS backend

1. `cd ./server/`
2. `yarn test`

NOTE: This command currently spawns the database docker container to make data available. In the future, a db can best be mocked.

## Open Question

Suppose you had to turn the above components into a production web application consumed by many concurrent users and
handling large volumes of data. What would you have to change/improve in order to achieve that?
