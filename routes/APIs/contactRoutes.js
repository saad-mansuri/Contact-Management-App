const express = require('express')
const { getAllContact, createContact, getContact, updateContact, deleteContact } = require('../../controllers/APIs/contactContorller')
const validateToken = require('../../middleware/validateTokenHandler')
const router = express.Router()

router.use(validateToken)
router.route('/').get(getAllContact).post(createContact)
router.route('/:id').get(getContact).put(updateContact).delete(deleteContact)

// route.get('/', getAllContact)
// route.post('/', createContact)
// route.get('/:id', getContact)
// route.put('/:id', updateContact)
// route.delete('/:id', deleteContact)

module.exports = router