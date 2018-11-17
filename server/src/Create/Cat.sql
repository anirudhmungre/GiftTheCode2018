CREATE TABLE IF NOT EXISTS Cat(
    id          INT NOT NULL,
    cName       VARCHAR(64),
    dob         DATE,
    sex         CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    age         INT NOT NULL,
    breed       VARCHAR(64),
    behavior    VARCHAR(256),
    pair        INT,
<<<<<<< HEAD
    stat        BIT DEFAULT 0,
    locId       INT NOT NULL,
=======
    stat        BIT CHECK (fixed IN (1, 0, NULL)) DEFAULT 0,
>>>>>>> e0971fc4b7c44235633d1e39b0ad188ac3440201
    adopterId   INT,
    PRIMARY KEY(id)
);