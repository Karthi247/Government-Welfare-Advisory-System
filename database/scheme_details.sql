-- USE welfare_db;

CREATE TABLE IF NOT EXISTS scheme_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_id INT NOT NULL,
    eligibility TEXT,
    benefits TEXT,
    documents_required TEXT,
    application_process TEXT,
    official_website VARCHAR(255),
    helpline_number VARCHAR(50),
    FOREIGN KEY (scheme_id) REFERENCES schemes(id)
);
