const { ObjectId } = require('mongodb');
const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db('project1').collection('contacts').find();
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
        } catch(error) {
            error.status = 500;
            throw error;
        }
};

const getSingle = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id)
        const result = await mongodb.getDatabase().db('project1').collection('contacts').find({_id: contactId});
        const contacts = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    } catch(error) {
        error.status = 500;
        throw error;
    }
};

const createContact = async (req, res) => {
    try {
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favColor: req.body.favColor,
            birthday: req.body.birthday
        };
        const response = await mongodb.getDatabase().db('project1').collection('contacts').insertOne(contact);
        if (response.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the user');
        }
    } catch(error) {
        error.status = 500;
        throw error;
    }
}

const updateContact = async (req, res) => {
    try {
        const contactId = new ObjectId(req.params.id)
        const contact = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favColor: req.body.favColor,
            birthday: req.body.birthday,
        };
        const response = await mongodb.getDatabase().db('project1').collection('contacts').replaceOne({_id: contactId }, contact);
        if (response.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the user');
        }
    } catch(error) {
        error.status = 500;
        throw error;
    }
}

const deleteContact = async (req, res) => {
    try {    
        const contactId = new ObjectId(req.params.id)
        const response = await mongodb.getDatabase().db('project1').collection('contacts').deleteOne({_id: contactId});
        if (response.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(response.error || 'Some error occured while updating the user');
        }
    } catch(error) {
        error.status = 500;
        throw error;
    }
}

module.exports = { 
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};