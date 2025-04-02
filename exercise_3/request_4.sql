WITH cte_employes AS (
    SELECT employes.*, string_agg(projets.nom_projet, ', ') AS projets
    FROM employes
        LEFT JOIN projets ON projets.employe_id = employes.id
    GROUP BY employes.id
)
SELECT id, nom,
       COALESCE(projets, 'Aucun projet')
FROM cte_employes
ORDER BY id;
