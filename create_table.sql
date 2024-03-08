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
    nickname VARCHAR(255),
    password VARCHAR(255),
    phone BIGINT,
    type CHAR(1) NOT NULL,
    created_at INT NOT NULL,
    updated_at INT
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

-- orders table
CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    provider_id INT REFERENCES users(user_id),
    client_id INT REFERENCES users(user_id),
    price DECIMAL(10, 2) NOT NULL,
    is_done BOOLEAN DEFAULT FALSE,
    is_paid BOOLEAN DEFAULT FALSE,
    context TEXT,
    created_at INT NOT NULL,
    updated_at INT
);

-- services table
CREATE TABLE services (
    service_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    created_at INT NOT NULL,
    updated_at INT
);

-- products table
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    gtin VARCHAR(14),
    price DECIMAL(10, 2) NOT NULL,
    created_at INT NOT NULL,
    updated_at INT
);

-- order_products junction table
CREATE TABLE order_products (
    order_product_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    product_id INT REFERENCES products(product_id),
    created_at INT NOT NULL,
    updated_at INT
);

-- order_services junction table
CREATE TABLE order_services (
    order_service_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    service_id INT REFERENCES services(service_id),
    created_at INT NOT NULL,
    updated_at INT
);

-- order_images table
CREATE TABLE order_images (
    service_picture_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES orders(order_id),
    picture_url VARCHAR(255),
    created_at INT NOT NULL,
    updated_at INT
);