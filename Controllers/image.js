const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey : 'b07c12096a22467a8b0b7bdb037351d2'
})
 const handleApiCall = (req, res) => {
    app.models
        .predict(/*'face-detection'*/Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('unable to work with API'))
     }

const handleImage = (req, res, db) => {
    const {id} = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0].entries);
        })
        .catch(err => res.json(400).json('unable to get entries'))
    }

module.exports = {
    handleImage: handleImage,
    handleApiCall: handleApiCall
}