const {pool} = require('../config');
const {request, response} = require('express');

const getElencos = (request, response) => {
    pool.query('SELECT * FROM elencos order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o elenco: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const addElenco = (request, response) => {
    const {temporada, treinador, folha} = request.body;
    pool.query(`INSERT INTO elencos (temporada, treinador, folha) 
    values ($1, $2, $3) returning codigo, temporada, treinador, folha`,
    [temporada, treinador, folha],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao inserir o elenco: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Elenco criado",
            objeto: results.rows[0]
        })
    })
}

const updateElenco = (request, response) => {
    const {codigo, temporada, treinador, folha} = request.body;
    pool.query(`UPDATE elencos SET temporada=$1, treinador=$2, folha=$3
    where codigo=$4 returning codigo, temporada, treinador, folha`,
    [temporada, treinador, folha, codigo],
    (error, results) => {
        if (error){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao alterar o elenco: ' + error
            })
        }
        response.status(200).json({
            status : "success" , message : "Elenco alterado",
            objeto: results.rows[0]
        })
    })
}

const deleteElenco = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`DELETE FROM elencos WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao remover o elenco:Remova os jogadores dele primeiro! ' + 
                (error ? error :'Não removeu nenhuma linha')
            })
        }
        response.status(200).json({
            status : "success" , message : "Elenco removido"
        })
    })
}

const getElencoPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM elencos WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o elenco: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getElencos, addElenco, updateElenco, deleteElenco, getElencoPorCodigo
}

