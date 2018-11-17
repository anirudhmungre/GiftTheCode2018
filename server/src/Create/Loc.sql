CREATE TABLE IF NOT EXISTS Loc(
    id          INT NOT NULL,
    addr        VARCHAR(128),
    typ         VARCHAR(64) CHECK (typ IN ('Foster Home', 'Vet', 'Store', 'Shelter', 'Volunteer Centre', 'Adopted')),
    inDate      DATE,
    outDate     DATE,
    PRIMARY KEY(id)
);