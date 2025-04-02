-- Création des tables
CREATE TABLE employes (
    id SERIAL PRIMARY KEY,
    nom VARCHAR(50)
);

CREATE TABLE projets (
    id SERIAL PRIMARY KEY,
    employe_id INT,
    nom_projet VARCHAR(50),
    FOREIGN KEY (employe_id) REFERENCES employes(id)
);
