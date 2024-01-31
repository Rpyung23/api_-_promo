const express = require("express")
const app = express()

const UserController = require("../controller/user.controller")

app.post("/login_admin",async function (req,res)
{
    try {
        var datos = await UserController.loginUserController(req.body.user,req.body.pass)
        res.status(200).json({
            status_code : datos == null ? 300 : 200,
            data: datos == null ? null : datos,
            msm: datos == null ? "Credenciales no válidas" : "Login con éxito"
        })
    }catch (e) {
        res.status(200).json({
            status_code :400,
            data: null,
            msm: e.toString()
        })
    }
})


app.post("/create_admin",async function (req,res)
{
    try {
        var datos = await UserController.createUsuarioController(req.body.email,req.body.pass,
            req.body.name,req.body.photo)
        res.status(200).json({
            status_code : datos ? 200 : 300,
            msm: datos ? "Usuario creado con éxito" : "Error al crear usuario"
        })
    }catch (e) {
        res.status(200).json({
            status_code :400,
            msm: e.toString()
        })
    }
})

app.post("/assign_user_business",async function (req,res)
{
    try {
        var datos = await UserController.assignUsuarioBusinessController(req.body.user,req.body.business)
        res.status(200).json({
            status_code : datos ? 200 : 300,
            msm: datos ? "Negocio asignado con éxito" : "Error al asignar negocio"
        })
    }catch (e) {
        res.status(200).json({
            status_code :400,
            msm: e.toString()
        })
    }
})


app.post("/profile_usuario",async function(req,res)
{
    try {
        var data = await UserController.readProfileUsuarioController(req.body.email_client)

        res.status(200).json({
            status_code : data == null ? 300 : 200,
            msm : data ? "CLiente consultado con éxito" : "Error al consultar cliente",
            datos: data == null ? null : data
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString(),
            datos:null
        })
    }
})

module.exports = app