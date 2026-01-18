CREATE TABLE schemes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(100),
    min_age INT,
    max_income DOUBLE,
    category VARCHAR(30),
    occupation VARCHAR(50),
    disability_required VARCHAR(10),
    minority_required VARCHAR(10)
);

select * from schemes;

INSERT INTO schemes VALUES
(1, 'PM-KISAN', 18, 200000, 'ANY', 'Farmer', 'No', 'No'),
(2, 'Old Age Pension', 60, 300000, 'ANY', 'ANY', 'No', 'No'),
(3, 'Disability Pension', 18, 500000, 'ANY', 'ANY', 'Yes', 'ANY'),
(4, 'Minority Scholarship', 18, 250000, 'ANY', 'Student', 'No', 'Yes');