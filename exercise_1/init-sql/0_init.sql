-- Création de la table ventes
CREATE TABLE ventes (
    id SERIAL PRIMARY KEY,
    vendeur VARCHAR(50),
    date_vente DATE,
    montant NUMERIC(10,2)
);
