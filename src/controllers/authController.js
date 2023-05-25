require('dotenv').config();
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
   try {
      const { username, email, password } = req.body;

      // VERIFICA SI EXISTE UN USUARIO CON LOS DATOS DEL REQUEST
      const existingUser = await userModel.findOne({ email: email });
      if (existingUser) {
         return res.status(400).json({ message: 'User alredy exists.' });
      }

      // ENCRIPTA LA CONTRASEÑA
      const hashedPassword = await bcrypt.hash(password, 10);

      // CREA UN USUARIO
      const newUser = await userModel.create({
         email: email,
         password: hashedPassword,
         username: username
      });

      // GENERA EL TOKEN DEL USUARIO NUEVO
      const token = jwt.sign({ email: newUser.email, id: newUser._id }, SECRET_KEY);

      return res.status(201).json({ user: newUser, token: token })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
}

const signin = async (req, res) => {
   try {
      const { email, password } = req.body;

      // VERIFICA SI NO EXISTE UN USUARIO CON LOS DATOS DEL REQUEST
      const existingUser = await userModel.findOne({ email: email });
      if (!existingUser) {
         return res.status(400).json({ message: 'User not found.' });
      }

      // COMPARAR CONTRASEÑA DEL REQUEST Y CONTRASEÑA DEL USUARIO ENCONTRADO
      const matchPassword = await bcrypt.compare(password, existingUser.password);
      if (!matchPassword) {
         return res.status(400).json({ message: 'Invalid credentials.' });
      }

      // GENERA EL TOKEN DEL USUARIO NUEVO
      const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRET_KEY);

      res.status(200).json({ user: existingUser, token: token })
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
   }
}

module.exports = { signup, signin }