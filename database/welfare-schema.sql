CREATE TABLE welfare_schemes (
    scheme_id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(255),
    min_age INT,
    max_age INT,
    max_income DOUBLE,
    category VARCHAR(50),
    state VARCHAR(100),
    description TEXT,
    benefit_amount DOUBLE,
    active BOOLEAN
);

INSERT INTO welfare_schemes 
(scheme_name, min_age, max_age, max_income, category, state, description, benefit_amount, active)
VALUES
('PM Scholarship Scheme', 18, 25, 300000, 'SC', 'ALL',
 'Scholarship for SC students', 50000, true),

('Senior Citizen Pension', 60, 100, 200000, 'ALL', 'Tamil Nadu',
 'Monthly pension for senior citizens', 1000, true);
