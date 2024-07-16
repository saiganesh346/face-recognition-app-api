const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require("knex");

const register = require('./Controllers/register')
const signin = require('./Controllers/Signin')
const profile = require('./Controllers/profile')
const image = require('./Controllers/image')

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'Saiganesh@346',
      database: 'smart-brain'
    }
  });

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {res.send(db.users)})

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, db, bcrypt)})

app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => {image.handleImage(req, res, db)});

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});
    
app.listen(3000, () => {
    console.log('Running in Port 3000')
})