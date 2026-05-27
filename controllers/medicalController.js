const medicalModel = require('../models/medicalModel');
const refugeeModel = require('../models/refugeeModel');

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const records = await medicalModel.getAll();
    res.render('medical/index', { title: 'Medical Records', records });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load medical records');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugees = await refugeeModel.getAll();
    res.render('medical/add', { title: 'Add Medical Record', refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load add medical form');
    res.redirect('/medical');
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await medicalModel.create(req.body);
    req.flash('successMessage', 'Medical record created successfully');
    res.redirect('/medical');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to create medical record');
    res.redirect('/medical/add');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const record = await medicalModel.findById(req.params.id);
    const refugees = await refugeeModel.getAll();
    if (!record) return res.redirect('/medical');
    res.render('medical/edit', { title: 'Edit Medical Record', record, refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load medical record');
    res.redirect('/medical');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await medicalModel.update(req.params.id, req.body);
    req.flash('successMessage', 'Medical record updated successfully');
    res.redirect('/medical');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to update medical record');
    res.redirect(`/medical/edit/${req.params.id}`);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await medicalModel.delete(req.params.id);
    req.flash('successMessage', 'Medical record deleted successfully');
    res.redirect('/medical');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to delete medical record');
    res.redirect('/medical');
  }
};
