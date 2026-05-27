const complaintModel = require('../models/complaintModel');
const refugeeModel = require('../models/refugeeModel');

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const complaints = await complaintModel.getAll();
    res.render('complaints/index', { title: 'Complaints', complaints });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load complaints');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugees = await refugeeModel.getAll();
    res.render('complaints/add', { title: 'Add Complaint', refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load add complaint form');
    res.redirect('/complaints');
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await complaintModel.create(req.body);
    req.flash('successMessage', 'Complaint created successfully');
    res.redirect('/complaints');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to create complaint');
    res.redirect('/complaints/add');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const complaint = await complaintModel.findById(req.params.id);
    const refugees = await refugeeModel.getAll();
    if (!complaint) return res.redirect('/complaints');
    res.render('complaints/edit', { title: 'Edit Complaint', complaint, refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load complaint');
    res.redirect('/complaints');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await complaintModel.update(req.params.id, req.body);
    req.flash('successMessage', 'Complaint updated successfully');
    res.redirect('/complaints');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to update complaint');
    res.redirect(`/complaints/edit/${req.params.id}`);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await complaintModel.delete(req.params.id);
    req.flash('successMessage', 'Complaint deleted successfully');
    res.redirect('/complaints');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to delete complaint');
    res.redirect('/complaints');
  }
};
