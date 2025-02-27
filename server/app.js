if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
  }

const { OAuth2Client } = require("google-auth-library")
const authentication = require("./middlewares/authentication")

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Controller = require("./controllers/controller")
const cors = require("cors")
const errorHandler = require('./middlewares/errorHandler')



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.post('/google-sign-in', Controller.googleLogin)
app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.get('/user/male/:id', Controller.getMaleById)
app.get('/user/female/:id', Controller.getFemaleById)

app.use(authentication)

app.post('/generate', Controller.generate)
app.get('/test', Controller.test)
app.get('/user/male', Controller.getMales)
app.get('/user/female', Controller.getFemales)
app.post('/user/male/:id', Controller.postProfileMale)
app.post('/user/female/:id', Controller.postProfileFemale)
app.put('/user/male/:id', Controller.putProfileMale)
app.put('/user/female/:id', Controller.putProfileFemale)
app.post('/harmony', Controller.postHarmony)
app.delete('/harmony', Controller.deleteHarmony)
app.get('/harmonyMale/:id', Controller.getHarmoniesMale)
app.get('/harmonyFemale/:id', Controller.getHarmoniesFemale)

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})