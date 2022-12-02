const {pool} = require('../config');
const {request, response} = require('express');

const getEntrega = (request, response) => {
    pool.query('SELECT * FROM entrega order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o entrega: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const getEntregaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM entrega WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o entrega: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getEntrega, getEntregaPorCodigo
}

