DROP TABLE IF EXISTS basket;
DROP TABLE IF EXISTS product;

CREATE TABLE product (
  id INT NOT NULL,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  price DOUBLE NOT NULL,
  colour VARCHAR(100) NOT NULL,
  image VARCHAR(100) NOT NULL,
  PRIMARY KEY (id));

CREATE TABLE basket (
    product_id INT NOT NULL,
    quantity INT NOT NULL,
  CONSTRAINT product
    FOREIGN KEY (product_id)
    REFERENCES product (id),
    PRIMARY KEY (product_id));

INSERT INTO product (
    id,
    name,
    description,
    price,
    colour,
    image
) VALUES (
    1,
    'Disc logo shirt',
    'Unisex oversized t-shirt featuring hand screenprinted logo on the front, and a large illustration on the back.',
    25,
    'peaches and cream',
    'images/product1.jpg'
), (
    2,
    'Fitted logo shirt',
    'Fitted t-shirt featuring hand screenprinted logo on the front, and a large illustration on the back.',
    22,
    'white, red and blue',
    'images/product2.jpg'
), (
    3,
    'Small disc logo sweatshirt',
    'Limited edition ring-spun sustainable cotton sweatshirt with small hand embroidered logo. One size fits all.',
    38,
    'grey and peach',
    'images/product3.jpg'
), (
    4,
    'Original logo sweatshirt',
    'Sustainable ring-spun cotton sweatshirt with hand screenprinted logo on the front and text print on the back. Standard fit.',
    35,
    'white, red and blue',
    'images/product4.jpg'
), (
    5,
    'Original logo cap',
    '5-panel cap with hand embroidered logo. One size fits all.',
    20,
    'black',
    'images/product5.jpg'
), (
    6,
    'Classic logo tote bag',
    'Hand screenprinted logo on sustainable cotton tote bag.',
    10,
    'multicolour',
    'images/product6.jpg'
), (
    7,
    'Logo print face mask',
    'Sustainable cotton face mask with hand screen printed logo. Machine washable.',
    8,
    'cream',
    'images/product7.jpg'
), (
    8,
    'Bi-annual zine: issue 1',
    'Goof Crü zine premier issue. Limited run of 100 copies. Hand-bound and risograph printed.',
    7,
    'black',
    'images/product8.jpg'
);
