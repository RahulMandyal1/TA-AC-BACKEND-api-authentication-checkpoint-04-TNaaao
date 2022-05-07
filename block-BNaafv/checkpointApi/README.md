## Endpoints 


## List all the question
-- Authentication optional
-- Return all question in  the fomat mentioned below :

```js
{
  "questions": [
    {
      "tags": [
        "nodejs",
        "event-loop"
      ],
      "_id": "5ee88c476ca3063848ffec69",
      "title": "what is event loop",
      "description": "describe event loop in detail",
      "author": {
        "_id": "5ee48a5bc6ebc40c5f1b7251",
        "username": "ravi"
      },
      "createdAt": "2020-06-16T09:09:27.563Z",
      "updatedAt": "2020-06-16T09:09:27.563Z",
      "slug": "what-is-event-loop",
    },
    {
      "tags": [
        "nodejs",
        "streams"
      ],
      "_id": "5ee892fcc15117398049baa0",
      "title": "what are streams in Node.js ?",
      "description": "describe streams in detail",
      "author": {
        "_id": "5ee48a5bc6ebc40c5f1b7251",
        "username": "ravi"
      },
      "createdAt": "2020-06-16T09:38:04.834Z",
      "updatedAt": "2020-06-16T09:38:04.834Z",
      "slug": "what-are-streams-in-nodejs",
    }
  ]
}
```

## create  a question 
POST  /api/v1/question
```js 
{
    "title" : "what is event loop in the javascript",
    "description"  : "what is the main purpose of event loop",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}
```
-- Authentication Required
-- Requried fields: title  description , tags
-- Return an question 

## udpate an question

```js 
PUT  /api/v1/question/slug
{
    "title" : "what is event loop in the javascript",
    "description"  : "what is the main purpose of event loop",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}
```
-- Authentication Required
-- Requried fields: title  description , tags
-- Return an udpated question

## Delete an question 
DELETE  /api/v1/question/slug
```js 
{
    "title" : "what is event loop in the javascript",
    "description"  : "what is the main purpose of event loop",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}

```
-- Authentication Required
-- Return an deleted question

## Create an answer 
POST /api/v1/question/questionId/answer
```js 
{
    "text" :  " question answer here"
}
```
-- Authentication Required
-- Requried fields:  text 
-- Return an answer


## get all the answers of a question
GET /api/v1/question/questionId/answers
-- Authentication Required
-- Return all the answers of a question in this format

```js
{
  "answers": [
      {
          "_id": "5ee9a5f6de3ea642c94ff18d",
          "text": "Event loop manages node.js async operations",
          "author": {
              "_id": "5ee48a5bc6ebc40c5f1b7251",
              "username": "qwerty"
          },
          "createdAt": "2020-06-17T05:11:18.395Z",
          "updatedAt": "2020-06-17T05:11:18.395Z",
          "__v": 0
      },
      {
          "_id": "5ee9acbcd98b1243bbc183bc",
          "text": "Event loop spawns 4 sperate threads for async ops",
          "author": {
              "_id": "5ee48a5bc6ebc40c5f1b7251",
              "username": "max"
          },
          "createdAt": "2020-06-17T05:40:12.609Z",
          "updatedAt": "2020-06-17T05:40:12.609Z",
          "__v": 0
      }
  ]
}
```

## upvote an answer 

GET /api/v1/answers/answerid/upvote

-- Authentication Required
-- Return  an update answer
