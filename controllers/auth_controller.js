const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
const { response, request } = require("express");
const { generarJWT, generarRefreshJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");
const { Usuario } = require("../models/usuario");

const login = async (req = request, res = response) => {
  const { usuario, clave } = req.body
  try {
    const user = await Usuario.findOne({ where: { usuario, estado: true } })
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no existe"
      })
    }
    const validClave = bcryptjs.compareSync(clave, user.clave)
    if (!validClave) {
      return res.status(400).json({
        msg: "Clave Invalida"
      })
    }
    if (user.refreshToken) {
      try {
        jwt.verify(user.refreshToken, process.env.REFRESH_TOKEN_SECRET)
      } catch (e) {
        console.log(e);
        const refreshToken = await generarRefreshJWT(user.uid)
        user.update({ ...user, refreshToken })
      }
    } else {
      const refreshToken = await generarRefreshJWT(user.uid)
      user.update({ ...user, refreshToken })
    }

    const token = await generarJWT(user.uid)
    res.json({
      usuario: user,
      token,
      refreshToken: user.refreshToken

    });
  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: "Hable con Administrador"
    })
  }
};
const googleSignIn = async (req, res) => {
  const { id_token } = req.body
  let uid;
  try {
    const respGoogle = await googleVerify(id_token)
    const { usuario: user, img, correo } = respGoogle
    let usuario = await Usuario.findOne({
      where: {
        correo, estado: true
      }
    })
    if (!usuario) {
      const data = {
        usuario: correo.substring(0, correo.indexOf("@")),
        nombre: user.split(' ')[0].toLowerCase(),
        correo,
        clave: ":P",
        img,
        google: true
      }
      usuario = new Usuario(data)
      const usr = await usuario.save()
      uid = usr.uid
    }

    if (usuario.refreshToken) {
      try {
        jwt.verify(usuario.refreshToken, process.env.REFRESH_TOKEN_SECRET)
      } catch (e) {
        console.log(e);
        const refreshToken = await generarRefreshJWT(usuario.uid)
        usuario.update({ ...usuario, refreshToken })
      }
    } else {
      const refreshToken = await generarRefreshJWT(usuario.uid)
      usuario.update({ ...usuario, refreshToken })
    }

    const token = await generarJWT(usuario.uid)

    res.json({
      usuario,
      token,
      refreshToken: usuario.refreshToken
    })

  } catch (e) {
    console.log(e);
    res.status(400).json({
      ok: false,
      msg: "El Token no se pudo verificar"
    })
  }
}
const verification = async (req = request, res = response) => {
  const toResponse = req.toResponse
  try {
    // const validClave = bcryptjs.compareSync(clave, user.clave)
    // if (!validClave) {
    //   return res.status(400).json({
    //     msg: "Clave Invalida"
    //   })
    // }
    res.json(toResponse);
  } catch (e) {
    console.log(e)
    res.status(500).json({
      msg: "Hable con Administrador"
    })
  }
};
module.exports = {
  login,
  googleSignIn,
  verification
};
