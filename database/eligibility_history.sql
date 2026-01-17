CREATE TABLE eligibility_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age INT,
    gender VARCHAR(20),
    category VARCHAR(30),
    state VARCHAR(50),
    occupation VARCHAR(50),
    annual_income DOUBLE,
    disability VARCHAR(10),
    is_minority VARCHAR(10),
    eligibility_score DOUBLE,
    eligibility_status VARCHAR(30),
    checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);