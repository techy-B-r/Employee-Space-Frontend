CREATE DATABASE IF NOT EXISTS employee_space_db;
USE employee_space_db;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE departments (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    manager_id BIGINT,
    location VARCHAR(255)
);

CREATE TABLE employees (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    join_date DATE NOT NULL,
    position VARCHAR(255) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    department_id BIGINT NOT NULL,
    user_id BIGINT,
    address VARCHAR(500),
    date_of_birth DATE,
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE attendance (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT NOT NULL,
    date DATE NOT NULL,
    check_in_time TIME NOT NULL,
    check_out_time TIME,
    status VARCHAR(50) NOT NULL,
    remarks VARCHAR(500),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

CREATE TABLE leaves (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    employee_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    leave_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    approved_by BIGINT,
    reason TEXT,
    remarks VARCHAR(500),
    FOREIGN KEY (employee_id) REFERENCES employees(id),
    FOREIGN KEY (approved_by) REFERENCES employees(id)
);

CREATE TABLE complaints (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    filed_by BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    assigned_to BIGINT,
    created_at DATETIME NOT NULL,
    resolved_at DATETIME,
    resolution TEXT,
    rating DECIMAL(3, 2),
    FOREIGN KEY (filed_by) REFERENCES employees(id),
    FOREIGN KEY (assigned_to) REFERENCES employees(id)
);

CREATE TABLE meetings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    created_by BIGINT NOT NULL,
    location VARCHAR(255) NOT NULL,
    meeting_link VARCHAR(500),
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (created_by) REFERENCES employees(id)
);

CREATE TABLE meeting_attendees (
    meeting_id BIGINT NOT NULL,
    employee_id BIGINT NOT NULL,
    PRIMARY KEY (meeting_id, employee_id),
    FOREIGN KEY (meeting_id) REFERENCES meetings(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Add foreign key for manager in departments
ALTER TABLE departments ADD FOREIGN KEY (manager_id) REFERENCES employees(id);