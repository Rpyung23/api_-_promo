const express = require("express")
const app = express()
const BusinessController = require("../controller/business.controller")

app.post("/create_business",async function(req,res)
{
    try {
        var datos = await BusinessController.createBusniessController(req.body.ruc_negocio,
            req.body.nombre_negocio, req.body.foto_negocio,
            req.body.tel_contacto, req.body.dir_negocio)

        res.status(200).json({
            status_code : datos ? 200 : 300,
            msm : datos ? "Negocio creado con éxito" : "Error al registrar negocio"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


app.get("/list_business_active",async function(req,res)
{
    try {
        var datos = await BusinessController.listBusinessActiveController()

        res.status(200).json({
            status_code : datos.length > 0 ? 200 : 300,
            data : datos,
            msm : datos ? "Negocio encontrados con éxito" : "No existen negocios disponibles"
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            data : [],
            msm : e.toString()
        })
    }
})



module.exports = app