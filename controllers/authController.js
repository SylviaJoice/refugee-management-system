const adminModel = require('../models/adminModel');

const showLogin = (req, res) => {
  res.render('login', { title: 'Login' });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await adminModel.findByUsername(username);

    if (!admin) {
      req.flash('errorMessage', 'Invalid username');
      return res.redirect('/');
    }

    if (admin.password !== password) {
      req.flash('errorMessage', 'Invalid password');
      return res.redirect('/');
    }

    req.session.user = admin;
    res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    res.send('Error during login');
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect('/');
  });
};

module.exports = {
  showLogin,
  login,
  logout
};