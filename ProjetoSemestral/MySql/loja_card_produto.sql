CREATE SCHEMA loja;
USE loja;

CREATE TABLE card_produto (
  id int unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(75) NOT NULL,
  preço decimal(10,2) unsigned NOT NULL,
  caminho_imagem varchar(255) DEFAULT NULL,
  genero varchar(10) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE usuario (
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    adm TINYINT,
    email VARCHAR(255),
    CPF VARCHAR(11)
);

CREATE TABLE carrinho (
    id int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    produto_id int unsigned,
    user_id int unsigned,
    quantidade INT,
    FOREIGN KEY (produto_id) REFERENCES card_produto(id),
    FOREIGN KEY (user_id) REFERENCES usuario(id)
);

INSERT INTO `card_produto` (Nome, preço, caminho_imagem, genero) VALUES 
('Stetson Belle Étoile',350.00,'imagens/chapeufem1.jpg','Feminino'),
('Resistol Serenata',75.00,'imagens/chapeufem2.jpg','Feminino'),
('Ariat Desert Rose',500.00,'imagens/chapeufem3.jpg','Feminino'),
('Bailey Southwest Sunrise',1000.00,'imagens/chapeufem4.jpg','Feminino'),
('Twister Sundance Siren',250.00,'imagens/chapeufem5.jpg','Feminino'),
('Stetson Midnight Marquis',11111.00,'imagens/chapeumasc5.jpg','Masculino'),
('Resistol Genteel Gambler',100.00,'imagens/chapeumasc6.jpg','Masculino'),
('Ariat Gentleman\'s Gambit',100.00,'imagens/chapeumasc7.jpg','Masculino'),
('Bailey Western Royal Rambler',100.00,'imagens/chapeumasc8.jpg','Masculino'),
('Justin Boots Dapper Duke',100.00,'imagens/chapeumasc9.jpg','Masculino'),
('Stetson Royal Regency',2500.00,'imagens/chapeuchic1.jpg','Unisex'),
('Ariat Grandeur Gambler',2250.00,'imagens/chapeuchic2.jpg','Unisex'),
('Justin Boots Dapper Duke',3500.00,'imagens/chapeuchic3.jpg','Unisex');

INSERT INTO usuario (username, password, adm, email, CPF)
VALUES ('Fiu', '123', 1, 'email@example.com', '12345678901');



