CREATE DATABASE ecommerce;

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    model_number VARCHAR(255),
    sku VARCHAR(255)
);

CREATE TABLE Variants (
    variant_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    colour VARCHAR(50),
    quantity INT,
    price DECIMAL(10, 2),
    country VARCHAR(50),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    variant_id INT,
    delivery_date DATE,
    order_date DATE,
    quantity INT,
    total_price DECIMAL(10, 2),
    country_code VARCHAR(10),
    FOREIGN KEY (product_id) REFERENCES Products(product_id),
    FOREIGN KEY (variant_id) REFERENCES Variants(variant_id)
);

CREATE TABLE Logistics (
    logistics_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    warehouse_location VARCHAR(255),
    shipping_status VARCHAR(50),
    delivery_date DATE,
    country_code VARCHAR(10),
    currency VARCHAR(10),
    FOREIGN KEY (order_id) REFERENCES Orders(order_id)
);
