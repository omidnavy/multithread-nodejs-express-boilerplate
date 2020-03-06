**A boilerplate to use express server as a child process in Node.js app**

"I was working on an application where I needed to isolate my api gateway
, for security reasons and to keep my main app free from handling rest calls,
so I made and use a separate express app as a child process in my Node.js app, 
and now I'm sharing this as a boilerplate for those who got same situation.
This is not useful only for express, actually it's gonna work in all situations 
where the child process want to ask a question from it's parent, and needs the 
response,this will make everything easier, just as simple as calling an async
function. 
"

To run this example all you need is to have a clone of this project, 
`npm install` and `npm start`

The dependencies are "uuid" and "express" where the express can be removed or modify
to suit your needs. 
