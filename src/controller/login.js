require('dotenv').config()
const { query } = require('../repositories');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY;

const loginUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) return res.status(400).json({ mensagem: 'Email e senha são obrigatórios' });

  try {
    const { rows, rowCount } = await query(`SELECT * FROM users WHERE email = $1`, [email]);
    if (rowCount === 0) return res.status(404).json({ mensagem: 'Usuário não encontrado' });

    const usuario = rows[0];

    const senhaVerif = await bcrypt.compare(senha, usuario.password);
    if (!senhaVerif) return res.status(401).json({ mensagem: 'Usuário e/ou senha inválido(s)' });

    const token = jwt.sign({ id: usuario.id }, jwtSecret, { expiresIn: "8h" });

    return res.status(200).json({ token });

  } catch (error) {
    return res.status(400).json({message: error.message});
  }
}

module.exports = { loginUsuario }