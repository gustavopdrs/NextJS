
create table elencos (
	codigo serial primary key, 
	temporada varchar(40) not null, 
	treinador varchar(40) not null, 
	folha float(10) not null 	
);

create table jogadores (
	codigo serial primary key, 
	nome varchar(40) not null, 
	numero integer not null, 
	posicao varchar(40) not null, 
	elenco integer not null, 
	foreign key (elenco) references elencos (codigo)
);
/*-- 
-- inserindo registros na tabela prédios
insert into predios (nome, descricao, sigla) 
values ('Predio 5', 'Predio da Computação', 'P5')
returning codigo, nome, descricao, sigla;

-- criação da tabela salas
create table salas (
	codigo serial primary key, 
	numero integer not null, 
	descricao varchar(40) not null, 
	capacidade integer not null, 
	predio integer not null, 
	foreign key (predio) references predios (codigo)
);

-- inserindo alguns registros na tabela salas
insert into salas (numero, descricao, capacidade, predio) 
values (511, 'Laboratório', 12, 1), (301, 'Sala de aula', 12, 2)
returning codigo, numero, descricao, capacidade, predio;