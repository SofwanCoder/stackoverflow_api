# Stackoverflow Documentation

The stackoverflow task is basic implementation of [Stackoverflow](https://stackoverflow.com)

## Author 🚀

> @SOFWANCODER
---

## Documentation

The postman documentation can be accessed [here](https://documenter.getpostman.com/view/8937000/TW6xo8hf)

---

## Technologies

- Node JS
- Express
- Socket.io
- Jest

---

## Database

- [Postgres](https://www.postgresql.org/) (Sequelize ORM)

---

## Install NodeJS

To Install NodeJS, kindly go to [Nodejs](https://nodejs.com) and follow the necessary instructions required depending on
your PC Operating System

## MACOS

using a [package](https://nodejs.org/en/#download) simply download the installer

using [homebrew](https://github.com/Homebrew/legacy-homebrew)

```markdown
brew install node
```

---

## Windows

using a [package](https://nodejs.org/en/#download) simply download the installer

using [chocolatey](http://chocolatey.org/) to install Node

```markdown
cinst nodejs
```

---

## To install Postgres

For Windows users, you can kindly follow this
tutorials [here](https://learnsql.com/blog/how-to-install-postgresql-on-windows-in-5-minutes/) to install Postgres on
your local PC which explains how to create a database

For Mac users, you can kindly follow this tutorials [here](https://www.robinwieruch.de/postgres-sql-macos-setup)  to
install Postgres on your local PC which explains how to create a database


---

## Setup Database

To setup your database for the project, after creation kindly open the sequelize.ts file in the src folder of the
project and replace with your credentials

```markdown
    database: 'your database name',
    port: 5432,
    host: 'your host, localhost or host address',
    username: 'your username',
    password: 'your password'
```

### OR

Create a .env file in the root directory and add your databae details. It should have the following properties

```markdown
DATABASE_HOST= DATABASE_USERNAME= DATABASE_PASSWORD= DATABASE_NAME= DATABASE_PORT=
```

Kindly replace these values with the appropriate values based on your Database environment
---

## Start Development

Kindly clone the repo `https://gitlab.com/sofwancoder/stackoverflow_api`

### Installation

To install the necessary packages, in your folder directory kindly run

```markdown
npm i

# or

yarn add
```

* To continuously watch for changes
    * ```markdown 
      npm run dev
      ```

* To build your app for production
    * ```markdown
      npm run build
         ```


* To run your app server for production
    * ```markdown
      npm run start
         ```

* To run test cases
    * ```markdown
      npm run test
         ```

---

## Implementation Required

* Authentication
    * Login
    * Registration

* Questions
    * Asking
    * Replying

* Rating
    * Upvoting
    * Downvoting

Bonus Task

* Subscription

---

## Stackoverflow Rules based on the scope of implementation

1. How to gain reputation ?

   The primary way to gain reputation is by posting good questions and useful answers. Votes on these posts cause you to
   gain (or sometimes lose) reputation.
   > `NOTE:` A user reputation can't go less than 1
   
   > `NOTE:` A user can't have more than 40 voting activities per day
2. You gain reputation when :
    * question is voted up: +10
    * answer is voted up: +10
    * when your answer is accepted: +15

3. You lose reputation when :
    * your question is voted down: −2
    * your answer is voted down: −2
    * you vote down an answer: −1

---

## Things implemented

> `NOTE:` when making request to protected routes , add `Bearer` to the prefix of the token. eg 'Bearer JWT TOKEN'.

* Authentication
    * Registration
    * Login

* Question
    * Ask Question
    * Get All Questions with answers and comments
    * Get Single Question with answers and comments
    * Answer
        * Submit an answer
        * Mark an answer right
        * Delete an answer
    * Subscription
        * Subscribe to a question
        * Notification when there's an activity for a question
    * Comment
        * Comment to a question
        * Update Comment
        * Delete Comment

* Voting
    * Question
        * Upvote Question
        * Undo Upvote to a Question
        * Down Vote Question
        * Undo Downvote for a Question

    * Answer
        * Upvote Answer
        * Undo Upvote for an answer
        * Down vote Answer
        * Undo Downvote for an Answer

* Reputation

* Rate Limiter for the vote limit per day

> `NOTE:` All rules of stackoverflow were followed regarding reputation, upvote and downvote for questions and answers

---

## Thought Process

Understanding the task was a vital part of the process for me. I spent time studying Stackoverflow Network on my
browser, making sure I understand how things are handled and structured.

I went through their rules and regulations to give me a better understanding of every single activity carried out to aid
a detailed implementation of the required task.


---

## Contributions

---

## Challenges