const router = require('express').Router();
const contactsController = require('../controllers/contacts');
const validator = require('../utilities/userValidation');
const errorHandler = require('../utilities/errorHandler')

router.get('/', errorHandler(contactsController.getAll));
router.get('/:id', errorHandler(contactsController.getSingle));

router.post('/', ...validator.contactValidationRules(), validator.validate, errorHandler(contactsController.createContact));
router.put('/:id', ...validator.contactValidationRules(), validator.validate, errorHandler(contactsController.updateContact));
router.delete('/:id', errorHandler(contactsController.deleteContact));

module.exports = router;