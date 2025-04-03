-- Création des enums
CREATE TYPE status AS ENUM ('à faire', 'en cours', 'terminée');

-- Création des tables
CREATE TABLE taches (
    id SERIAL PRIMARY KEY,
    titre VARCHAR(50) NOT NULL,
    description TEXT,
    statut status DEFAULT 'à faire'
);
