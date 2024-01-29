const express = require("express")
const app = express()
const CuponController = require("../controller/cupon.controller")
app.post("/create_cupon",async function(req,res)
{
    try {
        var data = await CuponController.createCuponController(req.body.email,
            req.body.name,req.body.porcent,req.body.f_exp,req.body.cant,
            req.body.foto)

        res.status(200).json({
            status_code : data.estado ? 200 : 400,
            msm : data.estado ? "CUPONES CREADOS CON EXITO" : data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})

app.post("/read_all_cupon",async function(req,res)
{
    try {
        var data = await CuponController.readAllCuponController(req.body.email)

        res.status(200).json({
            status_code : data.length > 0 ? 200 : 300,
            datos: data.length > 0 ? data : [],
            msm : data.length > 0 ? 'CUPONES CONSULTADOS CON EXITO' : 'NO EXISTEN CUPONES DISPONIBLES'
        })

    }catch (e) {
        res.status(200).json({
            status_code : 400,
            datos: [],
            msm : e.toString()
        })
    }
})


app.put("/update_cupon",async function(req,res)
{
    try {
        var data = await CuponController.updateCuponController(req.body.code_cupon,
            req.body.nombre_cupon, req.body.porcetaje_descuento,
            req.body.fecha_expiracion, req.body.cant_cupon)

        res.status(200).json({
            status_code : data.estado ? 200 : 400,
            msm : data.estado ? "CUPON ACTUALIZADO CON EXITO" : data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString()
        })
    }
})


module.exports = app