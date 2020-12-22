const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const mydatabase = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
    // user : 'stephen',
    // password : 'NewY0rk!',
    // database : 'smart-brain'
  }
});

// mydatabase.select('*').from('users').then(data => {
// 	console.log(data);
// })

const app = express();

app.use(express.json());
app.use(cors());

// const database = {
// 	users: [
// 		{
// 			id:'123',
// 			name:'John',
// 			password: 'cookies',
// 			email: 'john@gmail.com',
// 			entries: 0,
// 			joined: new Date()
// 		},
// 		{
// 			id:'124',
// 			name:'Sally',
// 			password: 'bananas',
// 			email: 'sally@gmail.com',
// 			entries: 0,
// 			joined: new Date()
// 		}
// 	],
// 	login: [
// 		{
// 			id: '987',
// 			hash: '',
// 			email: 'john@gmail.com'
// 		}
// 	]
// }

app.get('/', (req, res) => {
	res.send('It is working');
})

app.post('/signin', (req, res) => { signin.handleSignin(req, res, mydatabase, bcrypt) })

app.post('/register', (req, res) => { register.handleRegister(req, res, mydatabase, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, mydatabase) })

app.put('/image', (req, res) => {image.handleImage(req, res, mydatabase) })

app.post('/imageurl', (req, res) => {image.handleApiCall(req, res) })

// app.put('/image', (req, res) => {
// 	const { id } = req.body;
// 	mydatabase('users').where('id', '=', id)
// 	.increment('entries', 1)
// 	.returning('entries')
// 	.then(entries => {
// 		res.json(entries[0]);
// 	})
// 	.catch(err => res.status(400).json('unable to get entries'))
// })

// bcrypt.hash("bacon", null, null, function(err, hash) {
//     // Store hash in your password DB.
// });



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
}) 