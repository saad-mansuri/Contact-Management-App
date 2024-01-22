const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
// @desc Get all contact
// @route GET /api/contact
// @access private
const getAllContact = asyncHandler(async (req, res) => {
    console.log('req :', req.user.id)
    const contact = await Contact.find({ user_id: req.user.id })
    if (!contact) {
        res.status(400);
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})

// @desc Create new contact
// @route POST /api/contact/{$contactID}
// @access private
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error('All fields are required')
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    console.log('contact :', contact);
    res.status(200).json({ Message: 'Contact creted successfully', data: contact })
})

// @desc Get Single contact
// @route Get /api/contact/{$contactID}
// @access private
const getContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id
    const getSelectedContact = await Contact.findById(contactId)
    if (!getSelectedContact) {
        res.status(400);
        throw new Error('Contact Not Found')
    }
    res.status(200).json(getSelectedContact)
})

// @desc Update contact
// @route Put /api/contact/{$contactID}
// @access private
const updateContact = asyncHandler(async (req, res) => {
    const contactId = req.params.id
    const getSelectedUpdateContact = await Contact.findById(contactId)
    if (!getSelectedUpdateContact) {
        res.status(400);
        throw new Error('Contact Not Found')
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        contactId,
        req.body,
        { new: true }
    )
    res.status(200).json({ Message: 'User Updated Successfully', data: updatedContact })
})

// @desc Delete contact
// @route Delete /api/contact/{$contactID}
// @access private
const deleteContact = asyncHandler(async (req, res) => {
    console.log('req.params.id :', req.params.id)
    const getSelectedDeleteContact = await Contact.findById(req.params.id)
    console.log('getSelectedDeleteContact :', getSelectedDeleteContact);
    if (!getSelectedDeleteContact || getSelectedDeleteContact === 'null' && getSelectedDeleteContact === null) {
        res.status(404)
        throw new Error("Contact not found")
    }
    await Contact.findByIdAndDelete(getSelectedDeleteContact)
    res.status(200).json({ Message: 'User Deleted Successfully', data: getSelectedDeleteContact })
})

module.exports = {
    getAllContact,
    createContact,
    getContact,
    updateContact,
    deleteContact
}

