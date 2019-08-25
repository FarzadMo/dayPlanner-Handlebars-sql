DROP DATABASE IF EXISTS day_planner_db;

CREATE DATABASE day_planner_db;

USE day_planner_db;

CREATE TABLE plans (

    id INT(10) NOT NULL AUTO_INCREMENT,
    plan VARCHAR(150),
    PRIMARY KEY (id)  
);

INSERT INTO plans (plan)
VALUES ("water the lawn"),("call Anne Mary")