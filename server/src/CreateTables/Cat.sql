CREATE TABLE IF NOT EXISTS Cat(
    id          INT NOT NULL,
    cName       VARCHAR(64),
    dob         DATE,
    img         BLOB(),
    sex         CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    breed       VARCHAR(64),
    behavior    VARCHAR(256),
    outcome     VARCHAR(64),
    locId       INT NOT NULL,
    adopterID   INT,
    PRIMARY KEY(id),
    FOREIGN KEY (locId) REFERENCES Loc(id),
    FOREIGN KEY (adopterID) REFERENCES Adopter(id)
);