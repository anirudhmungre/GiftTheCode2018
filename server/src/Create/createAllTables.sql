CREATE TABLE IF NOT EXISTS Cat(
    id          INT NOT NULL,
    cName       VARCHAR(64),
    dob         DATE,
    sex         CHAR(1) NOT NULL CHECK (sex IN ('M', 'F')),
    age         INT NOT NULL,
    breed       VARCHAR(64),
    behavior    VARCHAR(256),
    pair        INT,
    stat        BIT DEFAULT 0,
    locId       INT NOT NULL,
    adopterId   INT,
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS Adopter(
    id          INT NOT NULL,
    aName       VARCHAR(128),
    aAddress    VARCHAR(256),
    email       VARCHAR(128),
    phone       VARCHAR(64),
    screenDate  DATE,
    userConfirmationId INT,
    catId       INT,
    screenRes   BIT CHECK (flvTested IN (1, 0, NULL)),
    PRIMARY KEY (id)
);
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
CREATE TABLE IF NOT EXISTS Img(
    id INT NOT NULL,
    img BLOB,
    catId INT NOT NULL
);
CREATE TABLE IF NOT EXISTS Loc(
    id          INT NOT NULL,
    addr        VARCHAR(256),
    typ         VARCHAR(64) CHECK (typ IN ('Foster Home', 'Vet', 'Store', 'Shelter', 'Volunteer Centre', 'Adopted')),
    PRIMARY KEY(id)
);
CREATE TABLE IF NOT EXISTS User(
    id           INT NOT NULL,
    sName        VARCHAR(128),
    addr         VARCHAR(256),
    email        VARCHAR(128),
    phone        VARCHAR(64),
    empType      VARCHAR(64) CHECK (type IN ('Global Admin', 'Staff')),
    username     VARCHAR(64),
    passwd       VARCHAR(64),
    locId        INT NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE IF NOT EXISTS Visit(
    catId       INT NOT NULL,
    locId       INT NOT NULL,       
    inDate      DATE NOT NULL,
    outDate     DATE
);