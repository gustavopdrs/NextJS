const {pool} = require('../config');
const {request, response} = require('express');

const getFuncionario = (request, response) => {
    pool.query('SELECT * FROM funcionarios order by codigo',
        (error, results) => {
            if (error){
                return response.status(400).json(
                    {
                        status : 'error', 
                        message : 'Erro ao consultar o funcionario: ' + error
                    }
                );
            }
            response.status(200).json(results.rows);
        }       
    )
}


const getFuncionarioPorCodigo = (request, response) => {
    const codigo = parseInt(request.params.codigo);
    pool.query(`SELECT * FROM funcionarios WHERE codigo = $1`,
    [codigo],
    (error, results) => {
        if (error || results.rowCount == 0){
            return response.status(400).json({
                status : 'error', 
                message : 'Erro ao recuperar o funcionarios: ' + 
                (error ? error :'Não encontrou nenhuma linha')
            })
        }
        response.status(200).json(results.rows[0])
    })
}

module.exports = {
    getFuncionario, getFuncionarioPorCodigo
}

