create database blueserver;

use blueserver;

--Organizations
create table organizations (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    url VARCHAR(100),
    logo VARCHAR(50)
);

--People
CREATE TABLE people (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  id_organization INT(11) NOT NULL,
  name VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(50) UNIQUE,
  address VARCHAR(250),
  photo VARCHAR(50),
  birthday TIMESTAMP 
);

-- Areas
CREATE TABLE areas (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  id_organization INT(11) NOT NULL,
  name VARCHAR(100) NOT NULL
);


-- peopleAreas
CREATE TABLE peopleAreas (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  id_area INT(11) NOT NULL,
  id_person INT(11) NOT NULL,
  regdate TIMESTAMP 
);


--Users
CREATE TABLE users (
  id INT(11) PRIMARY KEY AUTO_INCREMENT,
  id_person INT(11) NOT NULL,
  username VARCHAR(50) NOT NULL DEFAULT '', 
  email VARCHAR(50) NOT NULL,
  password VARCHAR(60) NOT NULL
);

ALTER TABLE users
  ADD CONSTRAINT uq_users UNIQUE(id_person, email);
