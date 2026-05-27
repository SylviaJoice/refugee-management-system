const refugeeModel = require('../models/refugeeModel');
const shelterModel = require('../models/shelterModel');
const complaintModel = require('../models/complaintModel');
const aidModel = require('../models/aidModel');
const medicalModel = require('../models/medicalModel');
const familyModel = require('../models/familyModel');

exports.index = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.redirect('/');
    }

    const totalRefugees = await refugeeModel.countAll();
    const totalShelters = await shelterModel.countAll();
    const totalComplaints = await complaintModel.countAll();
    const totalAidRecords = await aidModel.countAll();
    const totalMedicalRecords = await medicalModel.countAll();
    const totalFamilyMembers = await familyModel.countAll();

    res.render('dashboard', {
      title: 'Dashboard',
      totalRefugees,
      totalShelters,
      totalComplaints,
      totalAidRecords,
      totalMedicalRecords,
      totalFamilyMembers
    });
  } catch (error) {
    console.error(error);
    req.flash('errorMessage', 'Unable to load dashboard data');
    res.redirect('/');
  }
};
