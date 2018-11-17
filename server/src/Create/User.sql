CREATE TABLE IF NOT EXISTS User(
    id           INT NOT NULL,
    sName        VARCHAR(128),
    addr         VARCHAR(256),
    email        VARCHAR(128),
    phone        INT(10),
    empType      VARCHAR(64) CHECK (type IN ('Paid', 'Volunteer', 'CEO'))
    usermame     VARCHAR(64),
    passwd       VARCHAR(64),
    locID        INT NOT NULL,
    PRIMARY KEY (id)
);