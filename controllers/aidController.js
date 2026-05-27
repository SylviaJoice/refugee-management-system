const aidModel = require('../models/aidModel');
const refugeeModel = require('../models/refugeeModel');

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const records = await aidModel.getAll();
    res.render('aid/index', { title: 'Aid Distribution', records });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load aid records');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugees = await refugeeModel.getAll();
    res.render('aid/add', { title: 'Add Aid Distribution', refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load add aid form');
    res.redirect('/aid');
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await aidModel.create(req.body);
    req.flash('successMessage', 'Aid distribution record created successfully');
    res.redirect('/aid');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to create aid record');
    res.redirect('/aid/add');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const record = await aidModel.findById(req.params.id);
    const refugees = await refugeeModel.getAll();
    if (!record) return res.redirect('/aid');
    res.render('aid/edit', { title: 'Edit Aid Distribution', record, refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load aid record');
    res.redirect('/aid');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await aidModel.update(req.params.id, req.body);
    req.flash('successMessage', 'Aid distribution record updated successfully');
    res.redirect('/aid');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to update aid record');
    res.redirect(`/aid/edit/${req.params.id}`);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await aidModel.delete(req.params.id);
    req.flash('successMessage', 'Aid distribution record deleted successfully');
    res.redirect('/aid');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to delete aid record');
    res.redirect('/aid');
  }
};
