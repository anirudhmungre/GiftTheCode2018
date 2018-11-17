CREATE TABLE IF NOT EXISTS Cat(
    id          INT NOT NULL,
    cName       VARCHAR(64),
    dob         DATE,
    sex         CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    age         INT NOT NULL,
    breed       VARCHAR(64),
    behavior    VARCHAR(256),
    stat        BIT CHECK (fixed IN (1, 0, NULL)) DEFAULT 0,
    locId       INT NOT NULL,
    adopterId   INT,
    PRIMARY KEY(id)
);