INSERT INTO Cat 
(id, cName, dob, sex, age, breed, behavior, pair, stat, locId, adopterId)
VALUES 
(0, "Patrick", '2018-05-11', 'M', 1, "Domestic Short-haired", "Patrick is young kitten who loves to play", NULL, 1, 0, 2),
(1, "Midnight", '2011-07-01', 'M', 7, "Bombay", "Midnight is super friendly with everyone", NULL, 0, 3, NULL),
(2, "JJ", '2015-04-12', 'M', 3, "Scottish Fold", "JJ is a timid, but loving cat", NULL, 1, 8, 1),
(3, "Bob", '2008-01-19', 'M', 10, "Maine Coon", "Bob is an old cat. Trying to not make it depressing cus Im euthanizing this cat", NULL, NULL, 4, NULL),
(4, "Abby", '2014-06-14', 'F', 4, "Russian Blue", "Abby is incredibly loving and is bonded with her best friend Gabby", 5, 0, 7, NULL),
(5, "Gabby", '2014-06-15', 'F', 4, "Siamese Cat", "Gabby is incredibly loving and is bonded with her best friend Abby", 4, 0, 2, NULL),
(6, "Violet", '2013-11-19', 'F', 5,"American Bobtail", "Violet is a sweet cat with a love of all other animals", NULL, 1, 3, 0),
(7, "Yimothy", '2009-07-14', 'M', 9, "Yaater", "Yimothy Yeetro is a Yeet Graduate of OnTechU", NULL, NULL, 4, NULL),
(8, "Jasper", '2011-12-24', 'M', 7, "American Short-haired", "Jasper is very friendly with everyone", NULL, 1, 2, 3),
(9, "Franky", '2010-02-06', 'M', 8, "Ocicat", "Franky is friendly with cats, not so friendly with dogs,", NULL, 1, 1, 4);

/*ID should really be autoIncremented */
/*We should create a locID for adopted cats, for a placeholder, I am using -1. We also need to have a similar value for Euthanized :(*/
/*Outcome could be removed as the information is ESSENTIALLY stored in location*/