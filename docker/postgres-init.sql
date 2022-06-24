CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(100) PRIMARY KEY,
    password VARCHAR(100) NOT NULL
);
INSERT INTO users(username,password) VALUES ('admin','admin');

CREATE TABLE IF NOT EXISTS plants (
    id INTEGER PRIMARY KEY,
    alias VARCHAR(100) NOT NULL
);
DELETE FROM plants;
INSERT INTO plants(id, alias) VALUES (1, 'Main');

CREATE TABLE IF NOT EXISTS sections (
    id INTEGER PRIMARY KEY,
    alias VARCHAR(100) NOT NULL,
    plant_id INTEGER NOT NULL REFERENCES plants(id)
);
DELETE FROM sections;
INSERT INTO sections(id,alias,plant_id) VALUES
    (1,'Section 1', 1),
    (2,'Section 2', 1),
    (3,'Section 3', 1),
    (4,'Section 4', 1),
    (5,'Section 5', 1),
    (6,'Section 6', 1),
    (7,'Section 7', 1);

CREATE TABLE IF NOT EXISTS belts (
    id INTEGER PRIMARY KEY,
    alias VARCHAR(100) NOT NULL,
    section_id INTEGER NOT NULL REFERENCES sections(id)
);
DELETE FROM belts;
INSERT INTO belts(id, alias, section_id) VALUES
    (1, 'Belt 1', 1),
    (2, 'Belt 2', 1),
    (3, 'Belt 3', 1),
    (4, 'Belt 4', 1),
    (5, 'Belt 5', 1),
    (6, 'Belt 6', 1),
    (7, 'Belt 7', 1),
    (8, 'Belt 8', 1),
    (9, 'Belt 9', 1),
    (10, 'Belt 10', 2),
    (11, 'Belt 11', 2),
    (12, 'Belt 12', 2),
    (13, 'Belt 13', 2),
    (14, 'Belt 14', 2),
    (15, 'Belt 15', 2),
    (16, 'Belt 16', 2),
    (17, 'Belt 17', 2),
    (18, 'Belt 18', 2),
    (19, 'Belt 19', 3),
    (20, 'Belt 20', 3),
    (21, 'Belt 21', 3),
    (22, 'Belt 22', 3),
    (23, 'Belt 23', 3),
    (24, 'Belt 24', 3),
    (25, 'Belt 25', 3),
    (26, 'Belt 26', 3),
    (27, 'Belt 27', 3),
    (28, 'Belt 28', 4),
    (29, 'Belt 29', 4),
    (30, 'Belt 30', 4),
    (31, 'Belt 31', 4),
    (32, 'Belt 32', 4),
    (33, 'Belt 33', 4),
    (34, 'Belt 34', 4),
    (35, 'Belt 35', 4),
    (36, 'Belt 36', 4),
    (37, 'Belt 37', 5),
    (38, 'Belt 38', 5),
    (39, 'Belt 39', 5),
    (40, 'Belt 40', 5),
    (41, 'Belt 41', 5),
    (42, 'Belt 42', 5),
    (43, 'Belt 43', 5),
    (44, 'Belt 44', 5),
    (45, 'Belt 45', 5),
    (46, 'Belt 46', 6),
    (47, 'Belt 47', 6),
    (48, 'Belt 48', 6),
    (49, 'Belt 49', 6),
    (50, 'Belt 50', 6),
    (51, 'Belt 51', 6),
    (52, 'Belt 52', 6),
    (53, 'Belt 53', 6),
    (54, 'Belt 54', 6),
    (55, 'Belt 55', 7),
    (56, 'Belt 56', 7),
    (57, 'Belt 57', 7),
    (58, 'Belt 58', 7),
    (59, 'Belt 59', 7),
    (60, 'Belt 60', 7),
    (61, 'Belt 61', 7),
    (62, 'Belt 62', 7),
    (63, 'Belt 63', 7);