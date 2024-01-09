-- Inserting mock data into companies table
INSERT INTO companies (name, plan_id, plan_timestamp, created_at)
VALUES ('Company A', 1, 1639987200, 1639987200),
       ('Company B', 2, 1639987200, 1639987200),
       ('Company C', 1, 1639987200, 1639987200);

-- Inserting mock data into users table
INSERT INTO users (company_id, name, email, password, phone, type, created_at)
VALUES (1, 'John Doe', 'john@example.com', 'password1', 123456789, 'C', 1639987200),
       (1, 'Jane Doe', 'jane@example.com', 'password2', 987654321, 'V', 1639987200),
       (2, 'Alice Smith', 'alice@example.com', 'password3', 555555555, 'A', 1639987200);

-- Inserting mock data into plans table
INSERT INTO plans (name, duration_type, price, created_at)
VALUES ('Basic Plan', 'M', 29.99, 1639987200),
       ('Premium Plan', 'Y', 99.99, 1639987200);

-- Inserting mock data into services table
INSERT INTO services (name, user_id, client_id, price, is_done, is_paid, context, created_at)
VALUES ('Service 1', 1, 2, 49.99, TRUE, TRUE, 'Context for Service 1', 1639987200),
       ('Service 2', 3, 1, 79.99, FALSE, FALSE, 'Context for Service 2', 1639987200);

-- Inserting mock data into products table
INSERT INTO products (name, gtin, created_at)
VALUES ('Product A', '12345678901234', 1639987200),
       ('Product B', '98765432109876', 1639987200);

-- Inserting mock data into service_products junction table
INSERT INTO service_products (service_id, product_id, price, created_at)
VALUES (1, 1, 19.99, 1639987200),
       (1, 2, 29.99, 1639987200),
       (2, 1, 39.99, 1639987200);

-- Inserting mock data into service_pictures table
INSERT INTO service_pictures (service_id, picture_url, created_at)
VALUES (1, 'https://example.com/image1.jpg', 1639987200),
       (1, 'https://example.com/image2.jpg', 1639987200),
       (2, 'https://example.com/image3.jpg', 1639987200);

