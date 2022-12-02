const {pool} = require('../config');
const {request, response} = require('express');

const getEstoque = (request, response) => {
    pool.query('SELECT * FROM estoque order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o estoque: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const getEstoquePorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM estoque WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o estoque: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getEstoque, getEstoquePorCodigo
}

