CREATE TABLE IF NOT EXISTS Health(
    id              INT NOT NULL,
    fivTested       BIT CHECK (fivTested IN (1, 0, NULL)),
    flvTested       BIT CHECK (flvTested IN (1, 0, NULL)),
    fvrcpVacDate    DATE,
    rabiesVacDate   DATE,
    fixed           BIT NOT NULL DEFAULT 0 CHECK (fixed IN (1, 0)),
    medNotes        VARCHAR(256),
    catId           INT NOT NULL,
    PRIMARY KEY (id)
);