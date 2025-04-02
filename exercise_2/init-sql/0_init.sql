-- Création de la table valeurs
CREATE TABLE valeurs (
    id SERIAL PRIMARY KEY,
    valeur DOUBLE PRECISION
);

-- Création de la table plages
CREATE TABLE plages (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50),
    borne_inf DOUBLE PRECISION,
    borne_sup DOUBLE PRECISION
);

-- Création de la fonction isnan si elle n'existe pas
DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_catalog.pg_proc WHERE proname = 'isnan') THEN
            CREATE FUNCTION isnan(DOUBLE PRECISION)
                RETURNS BOOLEAN AS $isnan$SELECT $1 = DOUBLE PRECISION 'NaN'$isnan$
                LANGUAGE sql;
        END IF;
    END $$;
