-- USE welfare_db;

CREATE TABLE IF NOT EXISTS applications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    scheme_id INT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    remarks TEXT,
    officer_id INT,
    submitted_at DATETIME,
    updated_at DATETIME,
    application_data TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (scheme_id) REFERENCES schemes(id)
);
