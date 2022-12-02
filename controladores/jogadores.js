const { pool } = require('../config');
const { request, response } = require("express");

const getJogadores = (request, response) => {
    pool.query(`select s.codigo as codigo, s.nome as nome, 
        s.numero as numero, s.posicao as posicao, 
        s.elenco as elenco, p.temporada as nomeelenco
        from jogadores s
        join elencos p on s.elenco = p.codigo
        order by s.codigo`, 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao consultar as jogadores: ' + error
            });
        }
        response.status(200).json(results.rows);
    })
}

const addJogador = (request, response) => {
    const {nome, numero, posicao, elenco} = request.body;
    pool.query(`insert into jogadores (nome, numero, posicao, elenco) 
    values ($1, $2, $3, $4)
    returning codigo, nome, numero, posicao, elenco`, 
    [nome, numero, posicao, elenco] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao inserir a jogador!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador criado!",
            objeto : results.rows[0]
        });
    })
}

const updateJogador = (request, response) => {
    const {codigo, nome, numero, posicao, elenco} = request.body;
    pool.query(`UPDATE jogadores
	SET nome=$1, numero=$2, posicao=$3, elenco=$4
	WHERE codigo=$5
returning codigo, nome, numero, posicao, elenco`, 
    [nome, numero, posicao, elenco, codigo] , 
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao atualizar a jogador!'
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador atualizado!",
            objeto : results.rows[0]
        });
    })
}


const deleteJogador = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM jogadores WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao remover a jogador! ' + (error ? error : '')
            });
        }
        response.status(200).json({
            status : 'success' , message : "Jogador removido!"
        });
    })
}

const getJogadorPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM jogadores WHERE codigo=$1`, 
                [codigo] , 
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error',
                message: 'Erro ao recuperar o jogador!'
            });
        }
        response.status(200).json(results.rows[0]);
    })
}

module.exports ={
    getJogadores, addJogador, updateJogador, deleteJogador, getJogadorPorCodigo
}