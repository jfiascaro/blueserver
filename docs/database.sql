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
  id_organizations INT(11) NOT NULL,
  username VARCHAR(16) NOT NULL,
  password VARCHAR(60) NOT NULL,
  fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
  ADD PRIMARY KEY (id);

ALTER TABLE users
  MODIFY id INT(11) NOT NULL AUTO_INCREMENT;