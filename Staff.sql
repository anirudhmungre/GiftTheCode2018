CREATE TABLE IF NOT EXISTS Staff(
    id          INT NOT NULL,
    name        VARCHAR(128),
    address     VARCHAR(256),
    email       VARCHAR(128),
    phone       INT(10),
    type        VARCHAR(64) CHECK (type IN ('Paid', 'Volunteer', 'CEO'))
    locID       INT NOT NULL,
    PRIMARY KEY (id)
);