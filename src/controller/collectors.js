const { query } = require('../repositories');
const bcrypt = require('bcrypt');

//validação de campos obrigatórios
function validateData(body) {
  if (!body.name) return "O campo 'name' é obrigatório.";
  if (!body.email) return "O campo 'email' é obrigatório.";
  if (!body.password) return "O campo 'password' é obrigatório.";
}

//CREATE
const signUpCollector = async (req, res) => {
  const { name, email, password } = req.body;

  const incompleteData = validateData(req.body);
  if (incompleteData) return res.status(404).json({ mensagem: incompleteData });

  try {
    const { rowCount } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (rowCount > 0) return res.status(400).json({ mensagem: 'Já existe usuário cadastrado com o e-mail informado' });

    const passwordCrypt = await bcrypt.hash(password, 10);

    const usuarioCadastrado = await query(`INSERT INTO users (user_type, name, email, password) VALUES ('collectors', $1, $2, $3)`, [name, email, passwordCrypt]);

    if (usuarioCadastrado.rowCount === 0) return res.status(400).json({ mensagem: 'Não foi possível cadastrar o usuário' });

    return res.status(201).json();
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

//READ
const getUserDetails = (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
      cpf: user.cpf,
      picture: user.picture,
      about: user.about,
      address_street: user.address_street,
      address_number: user.address_number,
      address_city: user.address_city,
      address_state: user.address_state,
      address_zip: address_zip,
      phone: user.phone
    });
  } catch (error) {
    return res.status(400).json({ mensagem: error.message });
  }
}

//UPDATE


module.exports = {
  signUpCollector,
  getUserDetails
}