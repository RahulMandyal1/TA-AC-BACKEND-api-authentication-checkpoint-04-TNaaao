## Endpoints

## List all the question

- `GET /api/v1/questions`
- Authentication optional
- Return a list of questions

```JSON
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

## create a question

- `POST /api/v1/question`

```JSON
{
    "title" : "what is event loop in the javascript",
    "description"  : "what is the main purpose of event loop",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}
```

- Authentication Required
- Requried fields are : title , description , tags
- Return a question

```JSON
{
    "question": {
        "title": "what is event loop in the javascript",
        "description": "what is the main purpose of event loop",
        "author": "6278a81bfc6207cf4b0cddeb",
        "tags": [
            "javascript",
            "interviewquestion",
            "asynchronousjs"
        ],
        "slug": "what-is-event-loop-in-the-javascript30611",
        "answers": [],
        "comments": [],
        "upvotedBy": [],
        "_id": "6278ba15fc49bc9d83a8fa37",
        "createdAt": "2022-05-09T06:52:05.088Z",
        "updatedAt": "2022-05-09T06:52:05.088Z",
        "__v": 0
    }
}
```

## udpate an question

- `PUT /api/v1/question/slug`

```JSON
{
    "title" : "what is event loop in the javascript",
    "description"  : "An event loop is often times the “main” of a program that handles events. If you have written a program you know that it will exit when it is done. Programs that run indefinitely like UI applications, video games, web servers, etc will have some form of an event loop. They can come in different flavors such as being a polling loop (check if there is an event every time it loops) or it can be handled via blocks and something triggers it to come and do it's job.",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}
```
- Authentication Required
- Requried fields: which field you want to update
- Return an udpated question

```JSON
{
    "question": {
        "_id": "6278ba15fc49bc9d83a8fa37",
        "title": "what is event loop in the javascript",
        "description": "An event loop is often times the “main” of a program that handles events. If you have written a program you know that it will exit when it is done. Programs that run indefinitely like UI applications, video games, web servers, etc will have some form of an event loop. They can come in different flavors such as being a polling loop (check if there is an event every time it loops) or it can be handled via blocks and something triggers it to come and do it's job.",
        "author": "6278a81bfc6207cf4b0cddeb",
        "tags": [
            "javascript",
            "interviewquestion",
            "asynchronousjs"
        ],
        "slug": "what_is_event_loop_in_the_javascript",
        "answers": [],
        "comments": [],
        "upvotedBy": [],
        "createdAt": "2022-05-09T06:52:05.088Z",
        "updatedAt": "2022-05-09T06:55:04.431Z",
        "__v": 0
    }
}
```

## Delete an question

- `DELETE /api/v1/question/slug`
- Authentication Required.
- Delete question along with its all reference.
- Return an deleted question.

```JSON
{
    "question": {
        "_id": "6278ba15fc49bc9d83a8fa37",
        "title": "what is event loop in the javascript",
        "description": "An event loop is often times the “main” of a program that handles events. If you have written a program you know that it will exit when it is done. Programs that run indefinitely like UI applications, video games, web servers, etc will have some form of an event loop. They can come in different flavors such as being a polling loop (check if there is an event every time it loops) or it can be handled via blocks and something triggers it to come and do it's job.",
        "author": "6278a81bfc6207cf4b0cddeb",
        "tags": [
            "javascript",
            "interviewquestion",
            "asynchronousjs"
        ],
        "slug": "what_is_event_loop_in_the_javascript",
        "answers": [],
        "comments": [],
        "upvotedBy": [],
        "createdAt": "2022-05-09T06:52:05.088Z",
        "updatedAt": "2022-05-09T06:55:04.431Z",
        "__v": 0
    }
}
```
## Create an answer
- `POST /api/v1/question/questionId/answer`
```JSON
{
    "text" :  "An event loop is something that pulls stuff out of the queue and places it onto the function execution stack whenever the function stack becomes empty.The event loop is the secret by which JavaScript gives us an illusion of being multithreaded even though it is single-threaded. The below illusion demonstrates the functioning of event loop well"
}
```
- Authentication Required
- Requried fields: text
- Return an answer
```JSON
{
    "answer": {
        "text": "An event loop is something that pulls stuff out of the queue and places it onto the function execution stack whenever the function stack becomes empty.The event loop is the secret by which JavaScript gives us an illusion of being multithreaded even though it is single-threaded. The below illusion demonstrates the functioning of event loop well",
        "author": "6278a81bfc6207cf4b0cddeb",
        "questionId": "6278ba15fc49bc9d83a8fa37",
        "upvoteCount": 0,
        "upvotedBy": [],
        "comments": [],
        "_id": "6278bc53fc49bc9d83a8fa3e",
        "createdAt": "2022-05-09T07:01:39.522Z",
        "updatedAt": "2022-05-09T07:01:39.522Z",
        "__v": 0
    }
}
```

## get all the answers of a question

- `GET /api/v1/question/questionId/answers`
-- Authentication Required
-- Return all the answers of a question in this format

```JSON
{
    "answers": [
        {
            "_id": "6278bc53fc49bc9d83a8fa3e",
            "text": "An event loop is something that pulls stuff out of the queue and places it onto the function execution stack whenever the function stack becomes empty.The event loop is the secret by which JavaScript gives us an illusion of being multithreaded even though it is single-threaded. The below illusion demonstrates the functioning of event loop well",
            "author": {
                "_id": "6278a81bfc6207cf4b0cddeb",
                "username": "Rahul"
            },
            "questionId": "6278ba15fc49bc9d83a8fa37",
            "upvoteCount": 0,
            "upvotedBy": [],
            "comments": [],
            "createdAt": "2022-05-09T07:01:39.522Z",
            "updatedAt": "2022-05-09T07:01:39.522Z",
            "__v": 0
        },
        {
            "_id": "6278bce5fc49bc9d83a8fa44",
            "text": "This is second test answer of this question for api endpoint",
            "author": {
                "_id": "6278a81bfc6207cf4b0cddeb",
                "username": "Rahul"
            },
            "questionId": "6278ba15fc49bc9d83a8fa37",
            "upvoteCount": 0,
            "upvotedBy": [],
            "comments": [],
            "createdAt": "2022-05-09T07:04:05.164Z",
            "updatedAt": "2022-05-09T07:04:05.164Z",
            "__v": 0
        }
    ]
}
```
## upvote an answer

GET /api/v1/answers/answerid/upvote

-- Authentication Required
-- Return an update answer
