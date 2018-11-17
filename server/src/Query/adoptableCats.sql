SELECT id, cName, age, sex
FROM Cat AS C, Health AS H, Loc AS L
WHERE
    C.id = H.catId AND
    C.locId = L.id AND
    H.fixed = 1;