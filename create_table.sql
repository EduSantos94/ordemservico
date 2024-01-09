-- companies table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    plan_id INT REFERENCES plans(plan_id),
    plan_timestamp INT,
    created_at INT NOT NULL,
    updated_at INT
);

-- users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    company_id INT REFERENCES companies(company_id),
    name VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    phone INTEGER,
    type CHAR(1) NOT NULL,
    created_at INT(11) NOT NULL,
    updated_at INT(11)
);

-- plans table
CREATE TABLE plans (
    plan_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    duration_type CHAR(1),
    price DECIMAL(10, 2),
    created_at INT NOT NULL,
    updated_at INT
);

-- services table
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    user_id INT REFERENCES users(user_id),
    client_id INT REFERENCES users(user_id),
    price DECIMAL(10, 2) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    is_paid BOOLEAN DEFAULT FALSE,
    context TEXT,
    created_at INT(11) NOT NULL,
    updated_at INT(11)
);

-- products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    gtin VARCHAR(14),
    created_at INT(11) NOT NULL,
    updated_at INT(11)
);

-- service_products junction table
CREATE TABLE service_products (
    service_id INT REFERENCES services(service_id),
    product_id INT REFERENCES products(product_id),
    price DECIMAL(10, 2),
    PRIMARY KEY (service_id, product_id),
    created_at INT(11) NOT NULL,
    updated_at INT(11)
);

-- service_pictures table
CREATE TABLE service_pictures (
    service_picture_id SERIAL PRIMARY KEY,
    service_id INT REFERENCES services(service_id),
    picture_url VARCHAR(255),
    created_at INT(11) NOT NULL,
    updated_at INT(11)
);


