CREATE
DATABASE IF NOT EXISTS `finance_manager`;
USE
`finance_manager`;

CREATE TABLE users
(
    user_id    int(11) NOT NULL PRIMARY KEY,
    first_name varchar(256) NOT NULL,
    last_name  varchar(256) NOT NULL,
    username   varchar(256) NOT NULL,
    password   VARCHAR(256) NOT NULL
);

CREATE TABLE expenses
(
    expense_id int(11) NOT NULL PRIMARY KEY,
    user_id    int(11) NOT NULL,
    date       datetime     NOT NULL,
    shop       varchar(256) NOT NULL,
    cost       decimal      NOT NULL
);

ALTER TABLE expenses
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TABLE incomes
(
    income_id int(11) NOT NULL PRIMARY KEY,
    user_id   int(11) NOT NULL,
    date      datetime     NOT NULL,
    source    varchar(256) NOT NULL,
    earning   decimal      NOT NULL
);

ALTER TABLE incomes
    ADD FOREIGN KEY (user_id) REFERENCES users (user_id);

CREATE TABLE hibernate_sequence
(
    next_val BIGINT
);
INSERT INTO hibernate_sequence
VALUES (1);

CREATE TABLE income_sequence
(
    next_val BIGINT
);
INSERT INTO income_sequence
VALUES (1);

CREATE TABLE expense_sequence
(
    next_val BIGINT
);


INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `username`, `password`)
VALUES (1, 'Nikola', 'Becic', 'nikola.becic', '$2a$08$Hj8mOw677/TFnwS/WHZMZe16pKDRnnIJ0VFzPBGPLAdIbcDwxa4Ye');

INSERT INTO expense_sequence
VALUES (1);
INSERT INTO `expenses` (`expense_id`, `user_id`, `date`, `shop`, `cost`)
VALUES (52, 1, '2023-01-01 00:00:00', 'Idea', 2500),
       (53, 1, '2023-01-20 00:00:00', 'Idea', 10000),
       (54, 1, '2023-01-13 00:00:00', 'Idea', 12000),
       (55, 1, '2023-02-01 00:00:00', 'Metro', 30000),
       (56, 1, '2023-03-01 00:00:00', 'Sport vision', 8000),
       (57, 1, '2023-03-16 00:00:00', 'Under armour', 15000),
       (58, 1, '2023-03-25 00:00:00', 'Idea', 7000),
       (59, 1, '2023-04-01 00:00:00', 'Idea', 1000),
       (60, 1, '2023-04-22 00:00:00', 'Idea', 120),
       (61, 1, '2023-04-29 00:00:00', 'Metro', 22000),
       (62, 1, '2023-05-19 00:00:00', 'Idea', 24000),
       (63, 1, '2023-06-15 00:00:00', 'Metro', 11000),
       (64, 1, '2023-06-30 00:00:00', 'Gigatron', 50000),
       (65, 1, '2023-02-17 00:00:00', 'Metro', 17000);

INSERT INTO `expense_sequence` (`next_val`)
VALUES (151);

INSERT INTO `hibernate_sequence` (`next_val`)
VALUES (2);

INSERT INTO `incomes` (`income_id`, `user_id`, `date`, `source`, `earning`)
VALUES (1, 1, '2023-05-01 09:37:13', 'Posao', 110000),
       (4, 1, '2023-01-01 00:00:00', 'Posao', 110000),
       (5, 1, '2023-02-01 00:00:00', 'Posao', 110000),
       (6, 1, '2023-03-01 00:00:00', 'Posao', 110000),
       (7, 1, '2023-04-01 00:00:00', 'Posao', 110000),
       (8, 1, '2022-12-01 00:00:00', 'Posao', 110000),
       (9, 1, '2022-11-01 00:00:00', 'Posao', 110000),
       (10, 1, '2022-10-01 00:00:00', 'Posao', 110000),
       (11, 1, '2023-09-01 00:00:00', 'Posao', 110000),
       (12, 1, '2022-08-01 00:00:00', 'Posao', 110000);

INSERT INTO `income_sequence` (`next_val`)
VALUES (101);
