CREATE SCHEMA loja;
USE loja;

CREATE TABLE card_produto (
  id int unsigned NOT NULL AUTO_INCREMENT,
  nome varchar(75) NOT NULL,
  preço decimal(10,2) unsigned NOT NULL,
  caminho_imagem varchar(255) DEFAULT NULL,
  genero varchar(10) NOT NULL,
  categoria varchar(50) NOT NULL,
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

INSERT INTO `card_produto` (Nome, preço, caminho_imagem, genero, categoria) VALUES 
('Stetson Belle Étoile',350.00,'imagens/chapeufem1.jpg','Feminino', 'Chapéu'),
('Resistol Serenata',75.00,'imagens/chapeufem2.jpg','Feminino', 'Chapéu'),
('Ariat Desert Rose',500.00,'imagens/chapeufem3.jpg','Feminino', 'Chapéu'),
('Bailey Southwest Sunrise',1000.00,'imagens/chapeufem4.jpg','Feminino', 'Chapéu'),
('Twister Sundance Siren',250.00,'imagens/chapeufem5.jpg','Feminino', 'Chapéu'),
('Stetson Midnight Marquis',11111.00,'imagens/chapeumasc5.jpg','Masculino', 'Chapéu'),
('Resistol Genteel Gambler',100.00,'imagens/chapeumasc6.jpg','Masculino', 'Chapéu'),
('Ariat Gentleman\'s Gambit',100.00,'imagens/chapeumasc7.jpg','Masculino', 'Chapéu'),
('Bailey Western Royal Rambler',100.00,'imagens/chapeumasc8.jpg','Masculino', 'Chapéu'),
('Justin Boots Dapper Duke',100.00,'imagens/chapeumasc9.jpg','Masculino', 'Chapéu'),
('Stetson Royal Regency',2500.00,'imagens/chapeuchic1.jpg','Unisex', 'Chapéu'),
('Ariat Grandeur Gambler',2250.00,'imagens/chapeuchic2.jpg','Unisex', 'Chapéu'),
('Justin Boots Dapper Duke',3500.00,'imagens/chapeuchic3.jpg','Unisex', 'Chapéu');

INSERT INTO `card_produto` (nome, preço, caminho_imagem, genero, categoria) VALUES 
('Fivela Silver Shine', 120.00, 'imagens/fivelafem1.jpeg', 'Feminino', 'Fivela'),
('Fivela Prairie Harmony Buckle', 150.00, 'imagens/fivelaunisex1.jpeg', 'Unisex', 'Fivela'),
('Fivela Cowboy Classic', 85.00, 'imagens/fivelamasc1.jpeg', 'Masculino', 'Fivela');

INSERT INTO usuario (username, password, adm, email, CPF)
VALUES ('Fiu', '$2y$10$K8dpfZx9yAWemiCNWfaMEOaaNJJ99sN9uPbu.aWkFAFV4Om.wAGbq', 1, 'email@example.com', '12345678901');