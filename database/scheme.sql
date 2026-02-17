-- USE welfare_db;

CREATE TABLE IF NOT EXISTS schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(100),
    min_age INT,
    max_age INT,
    max_income DOUBLE,
    category VARCHAR(30),
    gender VARCHAR(20),
    location VARCHAR(100),
    occupation VARCHAR(50),
    disability_required VARCHAR(10),
    minority_required VARCHAR(10),
    description TEXT
);

