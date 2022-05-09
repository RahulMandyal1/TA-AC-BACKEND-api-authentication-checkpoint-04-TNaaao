## Authentication Header

Add jwt token in Header(authorization)

## status code

202 : a sucess message
401 : unauthorized requests when a user tries to access a resource without authentication
400 : For bad request that server not able to resolve

## Endpoints

### Authentication:

`POST /api/v1/users/login`

Example request body:

```JSON
{
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk0ZDY0N2RjYzY4ZmIyNzUzZDBlNSIsInVzZXJuYW1lIjoiUmFodWx0aGFrdXIiLCJlbWFpbCI6InVzZXJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NTIxMTY4MzZ9.4-f2k-iiC5asXZhqV9WCcRDie5aKl1Ghn0IXlSItprQ
}

```

- No authentication required, returns a logged in user

```JSON
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk0ZDY0N2RjYzY4ZmIyNzUzZDBlNSIsInVzZXJuYW1lIjoiUmFodWx0aGFrdXIiLCJlbWFpbCI6InVzZXJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NTIxMTY4MzZ9.4-f2k-iiC5asXZhqV9WCcRDie5aKl1Ghn0IXlSItprQ",
        "username": "Rahulthakur",
        "email": "useremail@gmail.com"
    }
}
```

## Registration

`POST /api/v1/users/register`

Example request body:

```JSON
{
    "name" : "Rahul thakur",
    "username" : "Rahulthakur",
	"email" : "useremail@gmail.com",
	"password" : "userpassword"
}

```

-No authentication required.
-Required Fields are `email , password , username`

- Returns a user

```JSON
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk0ZDY0N2RjYzY4ZmIyNzUzZDBlNSIsInVzZXJuYW1lIjoiUmFodWx0aGFrdXIiLCJlbWFpbCI6InVzZXJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NTIxMTY4MzZ9.4-f2k-iiC5asXZhqV9WCcRDie5aKl1Ghn0IXlSItprQ",
        "username": "Rahulthakur",
        "email": "useremail@gmail.com"
    }
}
```

## Get current logged in user data

`GET /api/v1/users/currentuser`

- Authentication required .
- Returns a currently logged in user

```JSON
{
    "user": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNzk0ZDY0N2RjYzY4ZmIyNzUzZDBlNSIsInVzZXJuYW1lIjoiUmFodWx0aGFrdXIiLCJlbWFpbCI6InVzZXJlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE2NTIxMTY4MzZ9.4-f2k-iiC5asXZhqV9WCcRDie5aKl1Ghn0IXlSItprQ",
        "username": "Rahulthakur",
        "email": "useremail@gmail.com"
    }
}
```

## Get user profile

- `GET /api/profiles/:username`
- Authentication optional
- Returns a user profile

```JSON
{
    "profile": {
        "name": "Rahul thakur",
        "username": "Rahul thakur",
        "image": "https://www.userimage/rahulthakur.com",
        "bio": " a passionate full stack web developer . i love javascript"
    }
}
```

## Update user profile

- `PUT /api/profiles/:username`
- Authentication required
- update account only when if the user is owner of that profile
- optional fields `email , username , name , bio , avatar`
Example reqest body

```JSON
 {
        "bio": "currently a student soon to be a developer"
}

- Returns  an updated user
```JSON
{
    "profile": {
        "name": "Rahul thakur",
        "username": "Rahul thakur",
        "image": "https://www.userimage/rahulthakur.com",
        "bio": "currently a student soon to be a developer"
    }
}
```

## Follow a user profile 



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
````

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
