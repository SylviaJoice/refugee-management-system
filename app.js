const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

require('dotenv').config();
const db = require('./config/db');


const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const refugeeRoutes = require('./routes/refugeeRoutes');
const shelterRoutes = require('./routes/shelterRoutes');
const familyRoutes = require('./routes/familyRoutes');
const aidRoutes = require('./routes/aidRoutes');
const medicalRoutes = require('./routes/medicalRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'refugee-identity-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 2 * 60 * 60 * 1000 }
  })
);
app.use(flash());

app.use((req, res, next) => {
  res.locals.successMessage = req.flash('successMessage');
  res.locals.errorMessage = req.flash('errorMessage');
  res.locals.user = req.session.user;
  next();
});

app.use('/', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/refugees', refugeeRoutes);
app.use('/shelters', shelterRoutes);
app.use('/family', familyRoutes);
app.use('/aid', aidRoutes);
app.use('/medical', medicalRoutes);
app.use('/complaints', complaintRoutes);

app.use((req, res) => {
  res.status(404).render('404', { title: 'Page Not Found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
