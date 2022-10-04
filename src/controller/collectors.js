const { query } = require('../repositories');
const bcrypt = require('bcrypt');
const services = require('../services/collector');
//validação de campos obrigatórios
function validateData(body) {
  if (!body.nome) return "O campo 'nome' é obrigatório.";
  if (!body.email) return "O campo 'email' é obrigatório.";
  if (!body.senha) return "O campo 'senha' é obrigatório.";
}

//CREATE
const signUpCollector = async (req, res) => {
  const { nome, email, senha } = req.body;

  const incompleteData = validarDados(req.body);
  if (incompleteData) return res.status(404).json({ mensagem: incompleteData });

  try {
    const { rowCount } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (rowCount > 0) return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado' });

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await query(`INSERT INTO users (user_type, name, email, password) VALUES ('collectors', $1, $2, $3, $4)`,[nome, email, senhaCrypt, nome_loja]);

    if (usuarioCadastrado.rowCount === 0) return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

//READ
const getCollector = async (req, res) => {
  const email = req.params.email;
  if (!email) res.status(400).json({mensagem: 'Informar usuário'})

  try{
    const userRes = await services.getCollector(email);
    console.log(userRes);
    if (userRes.error) throw userRes.error;
    return res.status(200).send(userRes.result)
  }catch (err){
    if (err === 'Usuário não encontrado') return res.status(404).json({mensagem: err});
    return res.status(500).json({mensagem: err});
  }

}


//UPDATE
const updateCollector = async (req, res) => {
  const userInfos = req.body;
  const email = req.params.email;

  if (Object.keys(userInfos).length === 0) {
    return res.status(400).json({mensagem: 'Nenhuma informação de alteração'});
  }

  if (!email) return res.status(400).json({mensagem: 'Email necessário'})

  try{
    const update = await services.updateCollector(email, userInfos);
    if (update.error) throw update.error;

    return res.status(200).json({mensagem: 'Usuário alterado'});

  }catch(err){
    console.log(err);
    if (err === 'Usuário não encontrado') return res.status(404).json({mensagem: err});
    if (err === 'Usuário deletado') return res.status(404).json({mensagem: err});
    return res.status(500).json({mensagem: err});
  }
}


//DELETE
const deleteCollector = async (req,res) => {
  const email = req.params.email;

  if (!email) return res.status(400).json({mensagem: 'Email necessário como parametro'});
  try{

    const deletion = await services.deleteCollector(email);
    if(deletion.error) throw deletion.error
    
    return res.status(200).json({mensagem: deletion.result});

  }catch(err){

    if (err === 'Usuário não encontrado') return res.status(404).json({mensagem: err});
    if (err === 'Usuário já está deletado') return res.status(404).json({mensagem: err});
    return res.status(500).json(err);

  }
}

module.exports = {deleteCollector, updateCollector, getCollector};