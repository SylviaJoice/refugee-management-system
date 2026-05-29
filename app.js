const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const axios = require('axios');
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
app.post('/chatbot', async (req, res) => {
  try {
    const userMessage = req.body.message;

    const systemPrompt = `
You are an AI assistant for the Refugee Identity & Entitlement Management System website.
You help users understand how to use the website.

Website modules:
- Dashboard
- Refugees: add, view, update, delete refugee records
- Shelters: manage shelter details and available slots
- Family Members: add and view family details linked to refugees
- Aid Distribution: record aid type, quantity, date, and distributor
- Medical Records: store illness, treatment, doctor name, and visit date
- Complaints: submit and track refugee complaints

Rules:
- Answer only about this website and its features.
- Do not reveal passwords, API keys, database URLs, or private data.
- If user asks for actual refugee data, tell them to use the website tables.
- Keep answers short and beginner-friendly.
`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const botReply = response.data.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error('Chatbot error:', error.response?.data || error.message);
    res.json({ reply: 'Sorry, the chatbot is temporarily unavailable.' });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
