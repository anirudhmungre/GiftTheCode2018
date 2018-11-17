CREATE TABLE IF NOT EXISTS Loc(
    id          INT NOT NULL,
    addr        VARCHAR(256),
    typ         VARCHAR(64) CHECK (typ IN ('Foster Home', 'Vet', 'Store', 'Shelter', 'Volunteer Centre', 'Adopted')),
    PRIMARY KEY(id)
);