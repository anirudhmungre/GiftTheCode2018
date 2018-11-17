CREATE TABLE IF NOT EXISTS Staff(
    id           INT NOT NULL,
    sName        VARCHAR(128),
    addr         VARCHAR(256),
    email        VARCHAR(128),
    phone        INT(10),
    empType      VARCHAR(64) CHECK (type IN ('Paid', 'Volunteer', 'CEO'))
    locID        INT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (locID) REFERENCES Loc(id)
);