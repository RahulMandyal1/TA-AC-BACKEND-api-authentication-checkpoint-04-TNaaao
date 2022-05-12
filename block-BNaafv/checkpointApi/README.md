## Authentication Header

Add jwt token in Header(authorization)

## status code

202 : a sucess message
401 : unauthorized requests when a user tries to access a resource without authentication
400 : For bad request that server not able to resolve

## Endpoints

### Authentication:

-`POST /api/v1/users/login`
Example request body:

```JSON
{
        "email": "useremail@gmail.com",
        "password" : "userpasswordhere"
}
```

Required field are : `email , password`
No authentication required, returns a logged in user

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

-`POST /api/v1/users/register`

Example request body:

```JSON
{
    "id" : 1,
    "name" : "Rahul thakur",
    "username" : "Rahulthakur",
	"email" : "useremail@gmail.com",
	"password" : "userpassword"
}

```

No authentication required.
Required Fields are `email , password , username`

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

-`GET /api/v1/users/currentuser`

Authentication required .
Returns a currently logged in user

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
  Authentication optional
  Returns a user profile

```JSON
{
    "profile": {
           "id" : 1242,
        "name": "Rahul thakur",
        "username": "Rahul thakur",
        "image": "https://www.userimage/rahulthakur.com",
        "bio": " a passionate full stack web developer . i love javascript"
    }
}
```

## Update user profile

- `PUT /api/profiles/:username`
  Authentication required
  update account only when if the user is owner of that profile
  optional fields `email , username , name , bio , avatar`
  Example request body

````JSON
 {
        "bio": "currently a student soon to be a developer"
}

Returns  an updated user
```JSON
{
    "profile": {
        "id" : 12343,
        "name": "Rahul thakur",
        "username": "Rahul thakur",
        "image": "https://www.userimage/rahulthakur.com",
        "bio": "currently a student soon to be a developer"
    }
}
````

## Follow a user profile

- `GET /api/v1/profile/username/follow`
  Authentication required
  Returns a current user profile and target user profile whom you are following

- Response Example :

```JSON
{
    "user": {
        "id" : 1464,
        "name" : "ajay thakur",
        "username": "ajaythakur",
        "image": "https://www.userimage/ajaythakur.com",
        "bio": "currently a student soon to be a developer"

    },
    "targetedUser": {
        "id" : 1675,
        "name": "Rahul thakur",
        "username": "Rahulthakur",
         "bio" : "hey i'm Rahul thakur and coding is my passion"
    }
}

```

## Unfollow a user

- ` DELETE /api/v1/profile/username/follow`
  Authentication required
  Returns a current user profile and target user profile whom you are unfollowing

- Response Example :

```JSON
{
    "user": {
        "id" : 176567,
        "name" : "ajay thakur",
        "username": "ajaythakur",
        "image": "https://www.userimage/ajaythakur.com",
        "bio": "currently a student soon to be a developer"

    },
    "targetedUser": {
        "id" : 16767,
        "name": "Rahul thakur",
        "username": "Rahulthakur",
         "bio" : "hey i'm Rahul thakur and coding is my passion"
    }
}

```

## List all the question

- `GET /api/v1/questions`
  Authentication optional
  Return a list of questions
- Response format example

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
        "name" : "username here ",
        "username": "ravi",
        "image": "https://www.userimage/ajaythakur.com",
        "bio": "currently a student soon to be a developer"
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
        "name" : "username here ",
        "username": "ravi",
        "image": "https://www.userimage/ajaythakur.com",
        "bio": "currently a student soon to be a developer"
      },
      "createdAt": "2020-06-16T09:38:04.834Z",
      "updatedAt": "2020-06-16T09:38:04.834Z",
      "slug": "what-are-streams-in-nodejs",
    }
  ]
}
```

## A sigle returned question :

```JSON
{
    "question": {
        "tags": [
            "javascript ",
            " js",
            "interviewqeustion"
        ],
        "id": "627d0c9c320c6437710fa4d0",
        "title": "what is event loop in the javascript",
        "description": "what is the main purpose of event loop",
        "author": {
            "id": "627cee63b2abc399cf8d448b",
            "username": "ajaythakur",
            "image": "https://www.userimage/ajaythakur.com",
            "bio": "currently a student soon to be a developer"
        },
        "createdAt": "2022-05-12T13:33:16.056Z",
        "updatedAt": "2022-05-12T13:33:16.056Z",
        "slug": "what-is-event-loop-in-the-javascript53543",
        "upvoteCount": 0,
    }
}
```

## create a question

- `POST /api/v1/question`
  Authentication Required
  Requried fields are : title , description , tags.
  Return a created question.

- Request body example

```JSON
{
    "title" : "what is event loop in the javascript",
    "description"  : "what is the main purpose of event loop",
    "tags" : "javascript,interviewquestion,asynchronousjs"
}
```

- Resonse format example :

```JSON
{
    "question": {
        "tags": [
            "javascript ",
            " js",
            "interviewqeustion"
        ],
        "id": "627d0c9c320c6437710fa4d0",
        "title": "what is event loop in the javascript",
        "description": "what is the main purpose of event loop",
        "author": {
            "id": "627cee63b2abc399cf8d448b",
            "username": "ajaythakur",
            "image": "https://www.userimage/ajaythakur.com",
            "bio": "currently a student soon to be a developer"
        },
        "createdAt": "2022-05-12T13:33:16.056Z",
        "updatedAt": "2022-05-12T13:33:16.056Z",
        "slug": "what-is-event-loop-in-the-javascript53543",
        "upvoteCount": 0,
    }
}
```

## udpate an question

- `PUT /api/v1/question/slug`
  Authentication Required only user who created question can update question.
  Requried fields: which field you want to update
  Return an udpated question

## Delete an question

- `DELETE /api/v1/question/slug`
  Authentication Required. User who created question can only delete question.
  Delete question along with its all reference.
  Return an deleted question.


## Create comment on question 
- `POST /api/v1/questions/questionId/comment`
   Authentication Required 
   Required Fields: `content`

Request body Example

```JSON
{
    "comment" : {
        "content" : "this is first test comment on this question",
    }
}
```
- Response of created comment on a question

```JSON
{
    "comment": {
        "id": "627d12de4d8042c04cd8a0a7",
        "content": "this is first test comment",
        "author": {
            "id": "627cee63b2abc399cf8d448b",
            "username": "ajaythakur",
            "image": "https://www.userimage/ajaythakur.com",
            "bio": "currently a student soon to be a developer"
        }
    }
}
```

## Response of a single answer will be like

```JSON
{
  "_id": "5ee9acbcd98b1243bbc183bc",
  "text": "Event loop spawns 4 sperate threads for async ops",
  "author": {
         "_id": "5ee48a5bc6ebc40c5f1b7251",
        "name" : "username here ",
        "username": "ravi",
        "image": "https://www.userimage/ajaythakur.com",
        "bio": "currently a student soon to be a developer"
  },
  "questionId": "5ee9a59812b8c4425eb12a4a",
  "createdAt": "2020-06-17T05:40:12.609Z",
  "updatedAt": "2020-06-17T05:40:12.609Z",
}
```

## Create an answer

- `POST /api/v1/question/questionId/answer`
  Authentication Required
  Requried fields: text
  Return an answer

```JSON
{
    "text" :  "An event loop is something that pulls stuff out of the queue and places it onto the function execution stack whenever the function stack becomes empty.The event loop is the secret by which JavaScript gives us an illusion of being multithreaded even though it is single-threaded. The below illusion demonstrates the functioning of event loop well"
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
               "_id": "5ee48a5bc6ebc40c5f1b7251",
               "name" : "username here ",
               "username": "ravi",
               "image": "https://www.userimage/ajaythakur.com",
               "bio": "currently a student soon to be a developer"
            },
            "questionId": "6278ba15fc49bc9d83a8fa37",
            "upvoteCount": 0,
            "createdAt": "2022-05-09T07:01:39.522Z",
            "updatedAt": "2022-05-09T07:01:39.522Z",
            "__v": 0
        },
        {
            "_id": "5ee9acbcd98b1243bbc183bc",
            "text": "Event loop spawns 4 sperate threads for async ops",
            "author": {
               "_id": "5ee48a5bc6ebc40c5f1b7251",
               "name" : "username here ",
                "username": "ravi",
               "image": "https://www.userimage/ajaythakur.com",
               "bio": "currently a student soon to be a developer"
            },
              "upvoteCount": 0,
             "questionId": "5ee9a59812b8c4425eb12a4a",
             "createdAt": "2020-06-17T05:40:12.609Z",
             "updatedAt": "2020-06-17T05:40:12.609Z",
        }
    ]
}
```

## upvote an answer

- `GET /api/v1/answers/answerid/upvote`
 Authentication Required
 Return an update answer

## devote user answer 
- `DELETE /api/v1/answers/answerid/upvote`
 Authentication Required
 Return an update answer

## udpate an answer

- `PUT /api/v1/answers/id`
  Authentication Required only user who created answer can update answer.
  Requried fields: `text`
  Return an udpated answer

## Delete an answer

- `DELETE /api/v1/answers/id`
  Authentication Required only user who created answer can delete answer.
  Return an deleted answer
  Delete its all reference like delete all the comments 

## Create  an comment on question
## Create comment on question 
- `POST /api/v1/answers/answerId/comment`
   Authentication Required 
   Required Fields: `content`

Request body Example

```JSON
{
    "comment" : {
        "content" : "this is first test comment on this answer",
    }
}
```
- Response of created comment on answer
```JSON
{
    "comment": {
        "id": "627d12de4d8042c04cd8a0a7",
        "content": "this is first test comment",
        "author": {
            "id": "627cee63b2abc399cf8d448b",
            "username": "ajaythakur",
            "image": "https://www.userimage/ajaythakur.com",
            "bio": "currently a student soon to be a developer"
        }
    }
}
```


## admin protected routes 
- Only admin have access to these routes 


## block a user 
- `/api/v1/admindashboard/:username/block`
Admin authentication is required / only admin have access to this route
Return  a user profile which is blocked by admin

## unblock a user 
- `/api/v1/admindashboard/:username/unblock`
Admin authentication is required / only admin have access to this route
Return  a user profile which is unblocked by admin
