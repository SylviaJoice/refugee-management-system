const refugeeModel = require('../models/refugeeModel');
const shelterModel = require('../models/shelterModel');
const familyModel = require('../models/familyModel');

const sendResponse = (req, res, { success, message, redirectUrl, data }) => {
  if (req.xhr || req.headers.accept?.includes('application/json') || req.is('json')) {
    return res.json({ success, message, data });
  }

  if (success && redirectUrl) {
    req.flash('successMessage', message);
    return res.redirect(redirectUrl);
  }

  req.flash('errorMessage', message);
  return res.redirect(redirectUrl || '/refugees');
};

exports.list = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const search = req.query.search || '';
    const refugees = await refugeeModel.getAll(search);
    res.render('refugees/index', { title: 'Refugees', refugees, search });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load refugees');
    res.redirect('/dashboard');
  }
};

exports.showAddForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const shelters = await shelterModel.getAll();
    res.render('refugees/add', { title: 'Add Refugee', shelters });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load the add refugee form');
    res.redirect('/refugees');
  }
};

exports.create = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugeeId = await refugeeModel.create(req.body);
    const refugee = await refugeeModel.findById(refugeeId);

    if (!refugee) {
      return sendResponse(req, res, {
        success: false,
        message: 'Refugee could not be verified after creation',
        redirectUrl: '/refugees/add'
      });
    }

    return sendResponse(req, res, {
      success: true,
      message: 'Refugee created successfully',
      redirectUrl: '/refugees',
      data: refugee
    });
  } catch (error) {
    console.error(error);
    return sendResponse(req, res, {
      success: false,
      message: 'Unable to create refugee',
      redirectUrl: '/refugees/add'
    });
  }
};

exports.showEditForm = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugee = await refugeeModel.findById(req.params.id);
    const shelters = await shelterModel.getAll();
    if (!refugee) return res.redirect('/refugees');
    res.render('refugees/edit', { title: 'Edit Refugee', refugee, shelters });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load refugee details');
    res.redirect('/refugees');
  }
};

exports.update = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await refugeeModel.update(req.params.id, req.body);
    const refugee = await refugeeModel.findById(req.params.id);

    if (!refugee) {
      return sendResponse(req, res, {
        success: false,
        message: 'Refugee could not be verified after update',
        redirectUrl: `/refugees/edit/${req.params.id}`
      });
    }

    const fieldsToCompare = ['full_name', 'gender', 'age', 'nationality', 'phone_number', 'refugee_status'];
    const hasMatch = fieldsToCompare.every((field) => {
      return String(refugee[field] ?? '') === String(req.body[field] ?? '');
    });

    const shelterIdMatch = String(refugee.shelter_id ?? '') === String(req.body.shelter_id ?? '');

    if (!hasMatch || !shelterIdMatch) {
      return sendResponse(req, res, {
        success: false,
        message: 'Refugee update did not match expected values',
        redirectUrl: `/refugees/edit/${req.params.id}`,
        data: { refugee, submitted: req.body }
      });
    }

    return sendResponse(req, res, {
      success: true,
      message: 'Refugee updated successfully',
      redirectUrl: '/refugees',
      data: refugee
    });
  } catch (error) {
    console.error(error);
    return sendResponse(req, res, {
      success: false,
      message: 'Unable to update refugee',
      redirectUrl: `/refugees/edit/${req.params.id}`
    });
  }
};

exports.remove = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    await refugeeModel.delete(req.params.id);
    const refugee = await refugeeModel.findById(req.params.id);

    if (refugee) {
      return sendResponse(req, res, {
        success: false,
        message: 'Refugee could not be deleted',
        redirectUrl: '/refugees'
      });
    }

    return sendResponse(req, res, {
      success: true,
      message: 'Refugee deleted successfully',
      redirectUrl: '/refugees'
    });
  } catch (error) {
    console.error(error);
    return sendResponse(req, res, {
      success: false,
      message: 'Unable to delete refugee',
      redirectUrl: '/refugees'
    });
  }
};

exports.viewDetails = async (req, res) => {
  try {
    if (!req.session.user) return res.redirect('/');
    const refugee = await refugeeModel.findById(req.params.id);
    if (!refugee) return res.redirect('/refugees');
    const family = await familyModel.getByRefugeeId(req.params.id);
    res.render('refugees/view', { title: 'Refugee Details', refugee, family });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load refugee details');
    res.redirect('/refugees');
  }
};
