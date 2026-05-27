# Refugee Identity & Entitlement Management System

A full-stack web application built with Node.js, Express.js, MySQL, EJS, and Bootstrap.

## Features

- Admin login
- Dashboard with key statistics
- Refugee registration and management
- Family member management
- Shelter allocation management
- Aid distribution tracking
- Medical records management
- Complaint/request tracking
- Search refugees by name or nationality
- Responsive Bootstrap UI
- Full CRUD for all modules

## Project Structure

- `app.js` - Main application entry
- `config/db.js` - MySQL connection pool
- `controllers/` - Route controller logic
- `models/` - Database query models
- `routes/` - Express router modules
- `views/` - EJS templates and partials
- `public/` - Static assets (CSS, JavaScript)
- `database/schema.sql` - SQL schema and sample data

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create the MySQL database and tables:

   - Open MySQL console or a database client.
   - Run the SQL from `database/schema.sql`.

3. Update database credentials in `config/db.js` if needed:

   ```js
   host: 'localhost',
   user: 'root',
   password: 'password',
   database: 'refugee_management',
   ```

4. Start the app:

   ```bash
   npm start
   ```

   Or on Windows, you can use the helper script:

   ```powershell
   .\start-server.ps1
   ```

5. Open `http://localhost:3000`

## Admin Login

Use the sample admin account from the SQL file:

- Username: `admin`
- Password: `admin123`

## Notes

- This project uses server-side session authentication with `express-session`.
- All forms include basic Bootstrap validation.
- The dashboard aggregates counts for refugees, shelters, complaints, aid records, and medical records.
