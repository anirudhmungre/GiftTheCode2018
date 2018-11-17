CREATE TABLE IF NOT EXISTS Cat(
    id          INT NOT NULL,
    name        VARCHAR(64),
    dob         DATE,
    intakeDate  DATE,
    fostDate    DATE,
    sex         CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    breed       VARCHAR(64),
    behavior    VARCHAR(256),
    outcome     VARCHAR(64),
    healthId    INT NOT NULL,
    locId       INT NOT NULL,
    PRIMARY KEY(id)
);