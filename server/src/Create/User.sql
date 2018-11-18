CREATE TABLE IF NOT EXISTS User(
    id           INT NOT NULL,
    sName        VARCHAR(128),
    addr         VARCHAR(256),
    email        VARCHAR(128),
    phone        VARCHAR(64),
    empType      VARCHAR(64) CHECK (type IN ('Global Admin', 'Staff')),
    username     VARCHAR(64),
    passwd       VARCHAR(64),
    locId        INT NOT NULL,
    PRIMARY KEY (id)
);