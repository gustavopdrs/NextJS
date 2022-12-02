const {pool} = require('../config');
const {request, response} = require('express');

const getNota = (request, response) => {
    pool.query('SELECT * FROM notas order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o nota: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const getNotaPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM notas WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar a nota: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getNota, getNotaPorCodigo
}

