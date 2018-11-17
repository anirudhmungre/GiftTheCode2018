INSERT INTO Cat (id, cName, dob, img, sex, breed, behavior, bondedID, outcome, locId, adopterID)
/*ID should really be autoIncremented */
/*We should create a locID for adopted cats, for a placeholder, I am using -1. We also need to have a similar value for Euthanized :(*/
/*Outcome could be removed as the information is ESSENTIALLY stored in location*/
VALUES (0, "Patrick", 2018-05-11, Patrick.png, M, 1, "Domestic Short-haired", "Patrick is young kitten who loves to play", NULL, 1, 2),
VALUES (1, "Midnight", 2011-07-01, Midnight.png, M, 2, "Bombay", "Midnight is super friendly with everyone", NULL, 0, 2, NULL),
VALUES (2, "JJ", 2015-04-12, JJ.png, M, 3, "Scottish Fold", "JJ is a timid, but loving cat", 1, -1, 1),
VALUES (3, "Bob", 2008-01-19, Bob.png, M, 4, "Maine Coon", "Bob is an old cat. Trying to not make it depressing cus Im euthanizing this cat", NULL, NULL, HEAVEN, NULL),
VALUES (4, "Abby", 2014-06-14, Abby.png, F, 5, "Russian Blue", "Abby is incredibly loving and is bonded with her best friend Gabby", 5, 0, 1, NULL),
VALUES (5, "Gabby", 2014-06-15, Gabby.png, F, 6, "Siamese Cat", "Gabby is incredibly loving and is bonded with her best friend Abby", 4, 0, 1, NULL),
VALUES (6, "Violet", 2013-11-19, Violet.png, F, 7, "American Bobtail", "Violet is a sweet cat with a love of all other animals", NULL, 1, -1, 0),
VALUES (7, "Yimothy", 2009-07-14, Yeet.png, M, 8, "Yaater", "Yimothy Yeetro is a Yeet Graduate of OnTechU", NULL, "Euthanized", NULL, NULL),
VALUES (8, "Jasper", 2011-12-24, Jasper.png, M, 9, "American Short-haired", "Jasper is very friendly with everyone", NULL, 1, 3),
VALUES (9, "Franky", 2010-02-06), Franky.png, M, 10, "Ocicat", "Franky is friendly with cats, not so friendly with dogs,", NULL, 1, 4)
