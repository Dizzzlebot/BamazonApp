CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products
(
id INT NOT NULL
AUTO_INCREMENT,
product_name VARCHAR
(45) NULL,
department_name VARCHAR
(45) NULL,
price DECIMAL
(10,2) NULL,
stock_quantity INT NULL,
PRIMARY KEY
(id)
);

INSERT INTO products
    (product_name, department_name, price, stock_quantity)
VALUES
    ("joggers", "sports",
'42.50', 100);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("dresses", "womens",
' 49.99', 120);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("cologne", "mens",
'69.99', 75);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("pajamas", "kids",
'19.99', 40);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("winter boots", "shoes",
'99.99', 25);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("coffee table", "furniture",
'149.00', 12);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("Gussett Pillows", "Bed & Bath",
'25.99', 35);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("link bracelet", "Jewelry",
'548.99', 10);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("Movado Watch", "Watches",
'695.00', 5);

INSERT INTO products
    (product_name, department_name,
price,
stock_quantity
)
VALUES
    ("London Fog", "Plus Size Coats",
'164.99', 25);

