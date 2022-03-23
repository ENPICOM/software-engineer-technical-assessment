# ENPICOM Software Engineer Technical Assessment

> A template repository for our candidates to clone and get off to a running start.

## Instructions

Hello there! If you have been asked to complete this technical assessment, that means we
believe you are a promising candidate for one of our open vacancies.

We have provided you with a working template project, to save some time.
Of course if you prefer, feel free to delete the files and start from scratch.

You might have to make assumptions about the requirements, please write them down.
Please fork this repository, push your implementation and provide us with the link when you're finished.

Here's what we would like you to do:

### Server

Design and implement a REST API in TypeScript that exposes 2 endpoints:

-   Adding a DNA string (DNA strings consist of `ACTG` letters)
-   Searching for DNA strings, allowing an optional parameter for [Levenshtein distance](https://en.wikipedia.org/wiki/Levenshtein_distance) between search and match.

Both endpoints should validate their inputs. Both endpoints should also be tested.
Data should be persisted in a PostgreSQL database.

### Client

Design and implement a SPA in TypeScript + React that allows a user to interact with the above API
through their browser.

### Open Question

Suppose you had to turn the above components into a production web application consumed by many concurrent users and
handling large volumes of data. What would you have to change/improve in order to achieve that?

## Development

**Prerequisites:** you need NodeJS version 16 or above and Docker installed on your machine.

```bash
# install dependencies locally for editor support
npm --prefix server ci
npm --prefix client ci
# start a Dockerised development environment with auto reload
docker-compose up
```

## Evaluation

Some pointers on how we evaluate these assessments may be useful:

-   Primarily, we care about clean, understandable code. Imagine you were reviewing your implementation as a PR - would you approve?
-   Don't overengineer, don't introduce unnecessary dependencies. We like to see lean, pragmatic solutions. In particular, please do not use an ORM. We appreciate plain SQL at ENPICOM.
-   For the open question: it's fine to be honest about gaps in your knowledge. Being upfront about these does not reflect badly on you.
