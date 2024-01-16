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


module.exports = app