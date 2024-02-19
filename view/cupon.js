const express = require("express")
const app = express()
const CuponController = require("../controller/cupon.controller")
app.post("/create_cupon",async function(req,res)
{
    try {
        var data = await CuponController.createCuponController(req.body.email,
            req.body.name,req.body.porcent,req.body.f_exp,req.body.cant,
            req.body.foto,req.body.categoria)

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


app.get("/read_all_client_cupon",async function(req,res)
{
    try {
        var data = await CuponController.readAllCuponClientController()

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

app.get("/read_all_client_category_cupon",async function(req,res)
{
    try {
        var data = await CuponController.readAllCuponClientCategoryController(req.body.categoria)

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
            req.body.fecha_expiracion, req.body.cant_cupon,req.body.categoria)

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


app.put("/consumir_cupon",async function(req,res)
{
    var data = await CuponController.consumirCuponController(req.body.user,req.body.cupon)
    try {
        res.status(200).json({
            status_code : data.code,
            msm: data.msm
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm: e.toString()
        })
    }
})


app.post("/static",async function(req,res)
{
    try {
        var data1 = await CuponController.staticCuponVendidoController(req.body.email)
        var data2 = await CuponController.staticCuponOcupadoController(req.body.email)

        data1.cant_cupon_vn = data1.cant_cupon_vn != undefined && data1.cant_cupon_vn != null ? parseInt(data1.cant_cupon_vn) : 0
        data1.disponible_cupon_vn = data1.disponible_cupon_vn != undefined && data1.disponible_cupon_vn != null ? parseInt(data1.disponible_cupon_vn) : 0
        data1.tot_vn = data1.tot_vn != undefined && data1.tot_vn != null ? parseInt(data1.tot_vn) : 0
        data2.cant_cupon_ocp = data2.cant_cupon_ocp != undefined && data2.cant_cupon_ocp != null ? parseInt(data2.cant_cupon_ocp) : 0
        data2.disponible_cupon_ocp = data2.disponible_cupon_ocp != undefined && data2.disponible_cupon_ocp != null ? parseInt(data2.disponible_cupon_ocp) : 0
        data2.tot_ocp =  data2.tot_ocp != undefined && data2.tot_ocp != null ? parseInt(data2.tot_ocp) : 0

        res.status(200).json({
            status_code : 200,
            msm : "OK",
            cant_cupon_vn: parseFloat(Number((data1.cant_cupon_vn/data1.tot_vn)*100).toFixed(2)),
            disponible_cupon_vn: parseFloat(Number((data1.disponible_cupon_vn/data1.tot_vn)*100).toFixed(2)),
            tot_vn: data1.tot_vn,
            cant_cupon_ocp: parseFloat(Number((data2.cant_cupon_ocp/data2.tot_ocp)*100).toFixed(2)),
            disponible_cupon_ocp: parseFloat(Number((data2.disponible_cupon_ocp/data2.tot_ocp)*100).toFixed(2)),
            tot_ocp: data2.tot_ocp
        })
    }catch (e) {
        res.status(200).json({
            status_code : 400,
            msm : e.toString(),
            cant_cupon_vn: 0,
            disponible_cupon_vn: 0,
            tot_vn: 0,
            cant_cupon_ocp: 0,
            disponible_cupon_ocp: 0,
            tot_ocp: 0
        })
    }
})

module.exports = app