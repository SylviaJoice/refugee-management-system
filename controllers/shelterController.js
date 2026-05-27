const shelterModel = require('../models/shelterModel');

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const shelters = await shelterModel.getAll();
    res.render('shelters/index', { title: 'Shelters', shelters });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load shelters');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = (req, res) => {
  if (!req.session.user) return res.redirect('/');
  res.render('shelters/add', { title: 'Add Shelter' });
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await shelterModel.create(req.body);
    req.flash('successMessage', 'Shelter created successfully');
    res.redirect('/shelters');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to create shelter');
    res.redirect('/shelters/add');
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const shelter = await shelterModel.findById(req.params.id);
    if (!shelter) return res.redirect('/shelters');
    res.render('shelters/edit', { title: 'Edit Shelter', shelter });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load shelter information');
    res.redirect('/shelters');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await shelterModel.update(req.params.id, req.body);
    req.flash('successMessage', 'Shelter updated successfully');
    res.redirect('/shelters');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to update shelter');
    res.redirect(`/shelters/edit/${req.params.id}`);
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await shelterModel.delete(req.params.id);
    req.flash('successMessage', 'Shelter removed successfully');
    res.redirect('/shelters');
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to delete shelter');
    res.redirect('/shelters');
  }
};
