CREATE TABLE IF NOT EXISTS Location(
    id          INT NOT NULL,
    addr        VARCHAR(128),
    typ         VARCHAR CHECK (type IN ('Foster Home', 'Vet', 'Store', 'Shelter', 'Volunteer Centre', 'Adopted'))
    inDate      DATE,
    outDate     DATE,
    PRIMARY KEY(id)
);