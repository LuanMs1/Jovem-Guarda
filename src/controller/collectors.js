const { query } = require('../repositories');
const bcrypt = require('bcrypt');

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

    const usuarioCadastrado = await query(`INSERT INTO usuarios (user_type, name, email, password) VALUES ('collectors', $1, $2, $3, $4)`,[nome, email, senhaCrypt, nome_loja]);

    if (usuarioCadastrado.rowCount === 0) return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

//READ


//UPDATE


//DELETE