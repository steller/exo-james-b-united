SELECT plages.id,
       plages.nom,
       string_agg(CAST(valeurs.valeur AS TEXT), ', ') AS ensembles,
       'entre ' || plages.borne_inf || ' et ' || plages.borne_sup AS borne
FROM plages
LEFT JOIN valeurs ON (
        (plages.borne_inf IS NULL AND isnan(valeurs.valeur))
            OR plages.borne_inf <= valeurs.valeur
    ) AND (
        (plages.borne_sup IS NULL AND isnan(valeurs.valeur))
            OR plages.borne_sup >= valeurs.valeur
    )
GROUP BY plages.id;
