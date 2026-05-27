-- Refugee Identity & Entitlement Management System schema for PostgreSQL

CREATE TABLE IF NOT EXISTS admin (
  admin_id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS shelters (
  shelter_id SERIAL PRIMARY KEY,
  shelter_name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL,
  capacity INT NOT NULL,
  available_slots INT NOT NULL
);

CREATE TABLE IF NOT EXISTS refugees (
  refugee_id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  gender VARCHAR(50) NOT NULL,
  age INT NOT NULL,
  nationality VARCHAR(100) NOT NULL,
  phone_number VARCHAR(50),
  refugee_status VARCHAR(100) NOT NULL,
  shelter_id INT REFERENCES shelters(shelter_id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS family_members (
  member_id SERIAL PRIMARY KEY,
  refugee_id INT NOT NULL REFERENCES refugees(refugee_id) ON DELETE CASCADE,
  member_name VARCHAR(255) NOT NULL,
  relationship VARCHAR(100) NOT NULL,
  age INT NOT NULL,
  gender VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS aid_distribution (
  aid_id SERIAL PRIMARY KEY,
  refugee_id INT NOT NULL REFERENCES refugees(refugee_id) ON DELETE CASCADE,
  aid_type VARCHAR(255) NOT NULL,
  distribution_date DATE NOT NULL,
  quantity INT NOT NULL,
  distributed_by VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS medical_records (
  record_id SERIAL PRIMARY KEY,
  refugee_id INT NOT NULL REFERENCES refugees(refugee_id) ON DELETE CASCADE,
  illness VARCHAR(255) NOT NULL,
  treatment VARCHAR(255) NOT NULL,
  doctor_name VARCHAR(255) NOT NULL,
  visit_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS complaints (
  complaint_id SERIAL PRIMARY KEY,
  refugee_id INT NOT NULL REFERENCES refugees(refugee_id) ON DELETE CASCADE,
  complaint_title VARCHAR(255) NOT NULL,
  complaint_description TEXT NOT NULL,
  complaint_status VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data
INSERT INTO admin (username, password, email)
VALUES ('admin', 'admin123', 'admin@example.com');

INSERT INTO shelters (shelter_name, location, capacity, available_slots)
VALUES
  ('Hope Shelter', 'Sector 5', 120, 35),
  ('Safe Harbor', 'Block C', 90, 12);

INSERT INTO refugees (full_name, gender, age, nationality, phone_number, refugee_status, shelter_id)
VALUES
  ('Amina Yusuf', 'Female', 28, 'Somalia', '555-1234', 'Registered', 1),
  ('Khaled Omar', 'Male', 34, 'Syria', '555-5678', 'Registered', 2);

INSERT INTO family_members (refugee_id, member_name, relationship, age, gender)
VALUES
  (1, 'Sara Yusuf', 'Daughter', 5, 'Female'),
  (2, 'Mariam Omar', 'Wife', 30, 'Female');

INSERT INTO aid_distribution (refugee_id, aid_type, distribution_date, quantity, distributed_by)
VALUES
  (1, 'Food Pack', '2025-12-01', 1, 'Volunteer Team A'),
  (2, 'Clothing Kit', '2025-12-02', 1, 'Volunteer Team B');

INSERT INTO medical_records (refugee_id, illness, treatment, doctor_name, visit_date)
VALUES
  (1, 'Malaria', 'Medication', 'Dr. Ahmed', '2025-12-10'),
  (2, 'Injury', 'First aid', 'Dr. Farah', '2025-12-11');

INSERT INTO complaints (refugee_id, complaint_title, complaint_description, complaint_status)
VALUES
  (1, 'Water supply issue', 'Water is not reaching our shelter on time.', 'Pending'),
  (2, 'Food distribution delay', 'Aid delivery was delayed by two days.', 'In Progress');
