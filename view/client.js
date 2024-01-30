const express = require("express")
const app = express()
const ClientController = require("../controller/client.controller")

app.post("/create_client",async function(req,res)
{
    try {
        var datos = await ClientController.createClientController(req.body.email_client,req.body.name_client,
            req.body.dni_client, req.body.photo_client, req.body.sex_client, req.body.f_client, req.body.tel_client,
            req.body.pass_client)

        res.status(200).json({
            status_code : datos ? 200 : 300,
            msm : datos ? "CLiente creado con éxito" : "Error al registrar cliente"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.post("/login_client",async function(req,res)
{
    try {
        var datos = await ClientController.loginClientController(req.body.user,req.body.pass)

        res.status(200).json({
            status_code : datos != null ? 200 : 300,
            data : datos == null ? null : datos,
            msm : datos == null ? "Credenciales no válidas" : "Login con éxito"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            data: null,
            msm : e.toString()
        })
    }
})


module.exports = app