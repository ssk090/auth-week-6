const express = require('express');
const jwt = require('jsonwebtoken')

const app = express();
app.use(express.json());

const users = [];

const JWT_SECRET = "shiva";

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username, password
    })

    res.json({
        message: "You are signed up!"
    })
    console.log(users)
})


app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password)

    if (user) {
        const token = jwt.sign({
            username: user.username
        }, JWT_SECRET)
        user.token = token
        res.json({
            token
        })
        console.log(users)
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
})

app.get('/me', (req, res) => {
    const token = req.headers.authorization;

    const decodedInformation = jwt.verify(token, JWT_SECRET)
    const username = decodedInformation.username;

    if (username) {
        res.json({
            username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000, () => {
    console.log("Server Running on port 3000");
})
