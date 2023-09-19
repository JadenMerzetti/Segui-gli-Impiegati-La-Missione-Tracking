CREATE DATABASE IF NOT EXISTS employee_Tracker;
USE employee_Tracker;

CREATE TABLE IF NOT EXISTS department (
    name VARCHAR(255) NOT NULL,
    department_id INT AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS role (
    role_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    roles_department INT,
    FOREIGN KEY (roles_department) REFERENCES department(department_id)
);

CREATE TABLE IF NOT EXISTS employee (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    employee_role INT,
    employee_salary VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    employee_manager VARCHAR(255),
    department VARCHAR(255) NOT NULL,
    FOREIGN KEY (employee_role) REFERENCES role(role_id)
);

INSERT INTO department (name, department_id) VALUES 
('Human Resources', 1),
('Marketing', 2),
('Finance', 3),
('Legal', 4), 
('Sales', 5),
('Social Media', 6);

INSERT INTO role (title, salary, roles_department) VALUES 
('Human Resources Manager', 65000.00, '1'),
('Head of Marketing', 8000000.00,'2'),
('Senior Finance Manager', 20000000.00, '3'),
('Head Lawyer', 200000.00, '4'),
('Head of Sales', 62000.00, '5'),
('Social Media Manager', 105000.00, '6');

INSERT INTO employee (first_name, last_name, job_title, employee_salary, employee_manager, department) VALUES 
('John', 'Doe', 'Human Resources Manager', 65000.00, NULL, 'Human Resources'),
('Stevie', 'Nicks', 'Head of Marketing', 8000000.00, Null, 'Marketing'),
('Tom', 'Brady', 'Senior Finance Manager', 20000000.00, NULL, 'Finance'),
('Joe', 'Biden', 'Head Lawyer', 200000.00, NULL, 'Legal'),
('Barney', 'Stinson', 'Head of Sales', 62000.00, NULL, 'Sales'),
('Doja', 'Cat', 'Social Media Manager', 105000.00, NULL, 'Social Media');
