const familyModel = require('../models/familyModel');
const refugeeModel = require('../models/refugeeModel');

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const familyMembers = await familyModel.getAll();
    const refugees = await refugeeModel.getAll();
    res.render('family/index', { title: 'Family Members', familyMembers, refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load family members');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugees = await refugeeModel.getAll();
    res.render('family/add', { title: 'Add Family Member', refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load the add family member form');
    res.redirect('/family');
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await familyModel.create(req.body);
    req.flash('successMessage', 'Family member added successfully');
    res.redirect('/family');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to create family member');
    res.redirect('/family/add');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const member = await familyModel.findById(req.params.id);
    const refugees = await refugeeModel.getAll();
    if (!member) return res.redirect('/family');
    res.render('family/edit', { title: 'Edit Family Member', member, refugees });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load family member details');
    res.redirect('/family');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await familyModel.update(req.params.id, req.body);
    req.flash('successMessage', 'Family member updated successfully');
    res.redirect('/family');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to update family member');
    res.redirect(`/family/edit/${req.params.id}`);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await familyModel.delete(req.params.id);
    req.flash('successMessage', 'Family member removed successfully');
    res.redirect('/family');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to delete family member');
    res.redirect('/family');
  }
};
