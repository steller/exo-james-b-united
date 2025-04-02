CREATE OR REPLACE FUNCTION is_both_nan(
    valeur1 DOUBLE PRECISION,
    valeur2 DOUBLE PRECISION
)
    RETURNS BOOLEAN
    AS $$
    BEGIN
        RETURN (valeur1 IS NULL OR isnan(valeur1)) AND (valeur2 IS NULL OR isnan(valeur2));
    END;
    $$ LANGUAGE plpgsql;



-- Test de la fonction
SELECT plages.id,
       plages.nom,
       string_agg(CAST(valeurs.valeur AS TEXT), ', ') AS ensembles,
       'entre ' || plages.borne_inf || ' et ' || plages.borne_sup AS borne
FROM plages
    LEFT JOIN valeurs ON (
            is_both_nan(plages.borne_inf, valeurs.valeur)
                OR plages.borne_inf <= valeurs.valeur
        ) AND (
            is_both_nan(plages.borne_sup, valeurs.valeur)
                OR plages.borne_sup >= valeurs.valeur
        )
GROUP BY plages.id;
