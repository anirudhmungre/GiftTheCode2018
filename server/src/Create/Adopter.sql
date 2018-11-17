CREATE TABLE IF NOT EXISTS Adopter(
    id          INT NOT NULL,
    aName       VARCHAR(128),
    aAddress    VARCHAR(256),
    email       VARCHAR(128),
    phone       INT(10),
    screenDate  DATE,
    userConfirmationId INT,
    catId       INT,
    screenRes   BIT CHECK (flvTested IN (1, 0, NULL)),
    PRIMARY KEY (id)
);