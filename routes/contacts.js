const router = require('express').Router();
const contactsController = require('../controllers/contacts');
const validator = require('../utilities/userValidation');

router.get('/', contactsController.getAll);
router.get('/:id', contactsController.getSingle);

router.post('/', validator.contactValidationRules(), validator.validate, contactsController.createContact);
router.put('/:id', validator.contactValidationRules(), validator.validate, contactsController.updateContact);
router.delete('/:id', contactsController.deleteContact);

module.exports = router;