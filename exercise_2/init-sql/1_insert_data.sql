-- Insertion des données
INSERT INTO valeurs (valeur) VALUES
    (10),
    (20),
    (30),
    ('Infinity'),
    ('-Infinity'),
    ('NaN');

INSERT INTO plages (nom, borne_inf, borne_sup) VALUES
   ('Gamme 1', '-Infinity', 15),
   ('Gamme 2', 15, 25),
   ('Gamme 3', 25, 'Infinity'),
   ('Gamme NaN', NULL, NULL);
