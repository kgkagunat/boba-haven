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
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    }
    catch{
        res.status(500).send()
    }
})

app.post('/login', async (req,res) => {
    //Auth user 

    const username = req.body.username
    const user = { name: username } 

    if (user === null){
        return res.status(400).send('Invalid username or password')
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
            const accessToken = generateAccessToken(user)
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
            refreshTokens.push(refreshToken)
            res.json({accessToken: accessToken, refreshToken: refreshToken})
        }else {
            res.send('Invalid username or password')
        }
    }
    catch{
        res.status(500).send('Full failure')
    }

    
})

function generateAccessToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10m'})
}

app.listen(3000)

