require('dotenv').config()

const express = require("express")
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())

let refreshTokens = []//Needs to be moved into database, this was only for testing purposes.
const users = []//This line is serving the same purpose as above, testing purpose only, move to using the database after that is made.

app.post('/token', (req,res)=>{
    const refreshToken = req.body.token
    if (refreshToken === null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user)=> {
        if(err) return res.sendStatus(403)
        const accessToken = generateAccessToken({ name: user.name })
        res.json ({ accessToken: accessToken})
    })
})

app.delete('/logout', (req,res)=> {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
})

app.post('/signup', async (req, res) => {
    const username = req.body.username;
  const password = req.body.password;

  // Check if the username already exists
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    return res.status(400).send('Username already exists');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username: username, passwordHash: hashedPassword };
    users.push(newUser);
    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
})

app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    const user = users.find((user) => user.username === username);
  
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    
    try {
      if (await bcrypt.compare(password, user.passwordHash)) {
        const accessToken = generateAccessToken({ username: user.username });
        const refreshToken = jwt.sign({ username: user.username }, refreshTokenSecret);
        refreshTokens.push(refreshToken);
  
        res.json({ accessToken: accessToken, refreshToken: refreshToken });
      } else {
        res.status(401).send('Invalid username or password');
      }
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  });

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

app.listen(3000)

