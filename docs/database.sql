create database blueserver;

// Organizations
create table organizations (
    id INT(11) NOT NULL,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    url VARCHAR(100),
    logo VARCHAR(50)
);

ALTER TABLE organizations
  ADD PRIMARY KEY (id);

ALTER TABLE organizations
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;


// Users
CREATE TABLE users (
  id INT(11) NOT NULL,
  id_organization INT(11) NOT NULL,
  id_role INT(11) NOT NULL,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  fullname VARCHAR(100) NOT NULL,
  picture VARCHAR(50)
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;