const { query } = require('../repositories');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../secret');

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if(!authorization) return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado' });

  try {
    const token = authorization.replace('Bearer', '').trim();
    const { id } = await jwt.verify(token, jwtSecret);
    const { rows, rowCount } = await query (`SELECT * FROM usuarios WHERE id = $1`, [id]);

    if(rowCount === 0) return res.status(404).json({ mensagem: 'O usuário não foi encontrado'});

    const { senha, ...usuario } = rows[0];
    req.usuario = usuario;
    next();

  } catch (error){
    return res.status(401).json({ mensagem: 'Para acessar este recurso, um token de autenticação válido deve ser enviado' });
  }
}

module.exports = verifyToken;