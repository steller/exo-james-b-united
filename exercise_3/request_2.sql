WITH cte_employes AS (
    SELECT employes.*, string_agg(projets.nom_projet, ', ') AS projets
    FROM employes
        LEFT JOIN projets ON projets.employe_id = employes.id
    GROUP BY employes.id
)
SELECT *
FROM cte_employes
WHERE projets IS NOT NULL
ORDER BY id;
