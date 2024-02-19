const express = require("express")
const app = express()
const CategorieController = require("../controller/categorie.controller")
app.get('/categories',async function(req,res)
{
    try {
        var data = await CategorieController.readCategorieController()

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data.length > 0 ? data : [],
            msm : data.length > 0 ? 'CATEGORIAS CONSULTADOS CON EXITO' : 'NO EXISTEN CATEGORIAS DISPONIBLES'
        })

    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})

app.post('/create_categorie',async function(req, res)
{
    try {
        var data = await CategorieController.createCategorieController(req.body.detalle)

        res.status(200).json({
            status_code : data.estado ? 200 : 400,
            msm : data.estado ? "CATEGORIA CREADOS CON EXITO" : data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

module.exports = app