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

  const incompleteData = validateData(req.body);
  if (incompleteData) return res.status(404).json({ mensagem: incompleteData });

  try {
    const { rowCount } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (rowCount > 0) return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado' });

    const senhaCrypt = await bcrypt.hash(senha, 10);

    const usuarioCadastrado = await query(`INSERT INTO users (user_type, name, email, password) VALUES ('collectors', $1, $2, $3)`,[nome, email, senhaCrypt]);

    if (usuarioCadastrado.rowCount === 0) return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

//READ
const getCollector = async (req, res) => {
  // enviar usuario verificado do token
  res.json(req.user);

}


//UPDATE
const updateCollector = async (req, res) => {
  // retirando infos da requisição
  const userInfos = req.body;
  const id = req.user.id;

  if (Object.keys(userInfos).length === 0) {
    return res.status(400).json({mensagem: 'Nenhuma informação de alteração'});
  }

  try{
    //chamada de services, retorna {error: , result:}
    const update = await services.updateCollector(id, userInfos);
    if (update.error) throw update.error;

    return res.status(200).json({mensagem: 'Usuário alterado'});

  }catch(err){
    if (err === 'Usuário não encontrado') return res.status(404).json({mensagem: err});
    if (err === 'Usuário deletado') return res.status(404).json({mensagem: err});
    return res.status(500).json({mensagem: err});
  }
}


//DELETE
const deleteCollector = async (req,res) => {
  const id = req.user.id;

  try{

    const deletion = await services.deleteCollector(id);
    if(deletion.error) throw deletion.error;
    
    return res.status(200).json({mensagem: deletion.result});

  }catch(err){

    if (err === 'Usuário não encontrado') return res.status(404).json({mensagem: err});
    if (err === 'Usuário já está deletado') return res.status(404).json({mensagem: err});
    return res.status(500).json(err);

  }
}

module.exports = {deleteCollector, updateCollector, getCollector, signUpCollector};