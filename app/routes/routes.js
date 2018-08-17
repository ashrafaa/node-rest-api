var objectId = require('mongodb').ObjectID;

module.exports = function(app, db) {
    const includeFields = { _id: 0, name: 1 };
    app.get('/notes', (req, res) => {
        db.collection('notes').find({}, includeFields).toArray((err, items) => {
            if (err) {
                res.send({ 'error': 'An error occured when retrieving all'});
            } else {
                res.send(items);
            }
        });
    });

    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new objectId(id) };
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error occured when retrieving'});
            } else {
                res.send(item);
            }
        });
    });

    app.post('/notes', (req, res) => {
        const note = { 
            name: req.body.Name, 
            job: req.body.Job 
        };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occured when creating' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new objectId(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({ 'error': 'An error has occured when deleting'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });

    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new objectId(id) };
        const note = {
            name: req.body.Name,
            job: req.body.Job
        };
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error occured when updating'});
            } else {
                res.send(note);
            }
        });
    });
};