const { postSwiss, getAllSwiss, getSwissById } = require('../models/swiss');

const getRecordById = (req, res) => {
    const id = req.params.id;
    getSwissById(id, (err, record) => {
        if (err) {
            res.status(500).json({ message: 'Error accessing the record' });
        } else if (!record) {
            res.status(404).json({ message: 'Record not found' });
        } else {
            res.status(200).json(record);
        }
    });
};

const createPostSwiss = (req, res) => {
    const { title, path } = req.body;

    // Check if title is not a string or is a string that only contains digits
    if (typeof title !== 'string' || /^\d+$/.test(title)) {
        return res.status(400).json({ result: null, message: 'Unsuitable title' });
    }

    if (!path.startsWith('/images/') || !path.endsWith('.jpg')) {
        return res.status(400).json({ result: null, message: 'Invalid image path format' });
    }

    const swiss = { title, path };

    postSwiss(swiss, (err, result) => {
        if (err) {
            res.status(500).json({ message: 'An error occurred' });
        } else {
            res.status(201).json({ result: result, message: 'Swiss posted successfully' });
        }
    });
};

const getAllSwissRecords = (req, res) => {
    getAllSwiss((error, result) => {
        if (error) {
            res.status(500).json({ message: 'An error occurred' });
        } else {
            res.status(200).json({ data: result, message: 'Success' });
        }
    });
};

module.exports = { createPostSwiss, getAllSwissRecords, getRecordById };