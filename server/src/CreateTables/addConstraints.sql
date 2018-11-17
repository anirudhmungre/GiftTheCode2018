ALTER TABLE Cat (
    ADD CONSTRAINT fKeyLocID FOREIGN KEY (locId) REFERENCES Loc(id),
    ADD CONSTRAINT fKeyAdoptID  FOREIGN KEY (adopterID) REFERENCES Adopter(id)
);

ALTER TABLE Adopter (
    ADD CONSTRAINT fKeyStaffConfirmation FOREIGN KEY (staffConfirmationID) REFERENCES Staff(id),
    ADD CONSTRAINT fKeyCatID FOREIGN KEY (catId) REFERENCES Cat(id)
);

