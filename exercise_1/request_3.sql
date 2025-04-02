WITH ventes_avec_moyenne AS (
    SELECT *,
           SUM(montant) OVER (PARTITION BY vendeur, date_vente) AS somme_cumul_ventes,
           AVG(montant) OVER (PARTITION BY vendeur ORDER BY date_vente RANGE BETWEEN INTERVAL '1 month' PRECEDING AND CURRENT ROW) AS moyenne_mobile_ventes,
           DENSE_RANK() OVER (PARTITION BY vendeur ORDER BY montant DESC) AS rang
    FROM ventes
    ORDER BY vendeur, date_vente DESC, rang
)
SELECT ventes_avec_moyenne.*,
       (ventes_avec_moyenne.montant - ventes_avec_moyenne.moyenne_mobile_ventes) AS difference_moyenne_mobile
FROM ventes_avec_moyenne;
