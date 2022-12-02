const { Router } = require('express');

const controleElencos = require('./controladores/elencos');
const controleJogadores = require("./controladores/jogadores");
const controleEntregas = require("./controladores/entregas");
const controleEstoque = require("./controladores/estoque");
const controleFuncionarios = require("./controladores/funcionarios");
const controleNotas = require("./controladores/notas");
const rotas = new Router();

rotas.route('/elencos')
     .get(controleElencos.getElencos)
     .post(controleElencos.addElenco)
     .put(controleElencos.updateElenco)

rotas.route('/elencos/:codigo')
     .get(controleElencos.getElencoPorCodigo)
     .delete(controleElencos.deleteElenco)

rotas.route('/jogadores')
   .get(controleJogadores.getJogadores)
   .post(controleJogadores.addJogador)
   .put(controleJogadores.updateJogador)

rotas.route('/jogadores/:codigo')
   .get(controleJogadores.getJogadorPorCodigo)
   .delete(controleJogadores.deleteJogador)

rotas.route('/entregas')
   .get(controleEntregas.getEntrega)

rotas.route('/entregas/:codigo')
   .get(controleEntregas.getEntregaPorCodigo)
   
rotas.route('/estoque')
   .get(controleEstoque.getEstoque)

rotas.route('/estoque/:codigo')
   .get(controleEstoque.getEstoquePorCodigo)

rotas.route('/funcionarios')
   .get(controleFuncionarios.getFuncionario)

rotas.route('/funcionarios/:codigo')
   .get(controleFuncionarios.getFuncionarioPorCodigo)

rotas.route('/notas')
   .get(controleNotas.getNotaPorCodigo)

rotas.route('/notas/:codigo')
   .get(controleNotas.getNotaPorCodigo)

module.exports = rotas;