DROP DATABASE IF EXISTS project;
CREATE DATABASE project;

\c project;

CREATE TABLE userInfo (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  email VARCHAR,
  studentID VARCHAR,
  personID INTEGER
);

CREATE TABLE userAuth (
  password VARCHAR,
  email VARCHAR
);

INSERT INTO userInfo (name, email, studentID, personID)
  VALUES ('Egert Teesaar', 'egert.teesaar@gmail.com', 'B56190', '3960000');

INSERT INTO userAuth(email, password)
  VALUES('egert.teesaar@gmail.com','parool');
