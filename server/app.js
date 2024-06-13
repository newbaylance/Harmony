if(process.env.NODE_ENV !== "production") {
    require('dotenv').config()
  }

const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const Controller = require("./controllers/controller")
const cors = require("cors")



app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())


app.post('/register', Controller.register)
app.post('/login', Controller.login)
app.get('/user/male', Controller.getMales)
app.get('/user/female', Controller.getFemales)
app.post('/user/male/:id', Controller.postProfileMale)
app.post('/user/female/:id', Controller.postProfileFemale)
app.get('/user/male/:id', Controller.getMaleById)
app.get('/user/female/:id', Controller.getFemaleById)
app.get('/harmony', Controller.getHarmonies)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})