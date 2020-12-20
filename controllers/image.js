const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '89f6e42d763941b9a88857aecb8d1844'
});

const handleApiCall = (req, res) => {
app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res, mydatabase) => {
	const { id } = req.body;
	mydatabase('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}