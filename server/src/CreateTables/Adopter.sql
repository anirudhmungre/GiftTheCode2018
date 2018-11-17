CREATE TABLE IF NOT EXISTS Adopter(
    id          INT NOT NULL,
    aName       VARCHAR(128),
    aAddress    VARCHAR(256),
    email       VARCHAR(128),
    phone       INT(10),
    screenDate  DATE,
    staffConfirmationID INT,
    catId       INT,
    screenRes   VARCHAR(1) CHECK (type IN ('Pass', 'Fail')),
    PRIMARY KEY (id),
    FOREIGN KEY (staffConfirmationID) REFERENCES Staff(id),
    FOREIGN KEY (catId) REFERENCES Cat(id)
);