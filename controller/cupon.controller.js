const CuponModel = require("../model/cupon.model")
class CuponController
{

    static async consumirCuponController(user,code_cupon)
    {
        return await CuponModel.consumirCuponModel(user,code_cupon)
    }
    static async readAllCuponClientController()
    {
        return await CuponModel.readAllCuponClientModel();
    }
    static async readAllCuponController(email){
        return await CuponModel.readAllCuponModel(email)
    }
    static async createCuponController(email,name,porcent,f_exp,cant,foto,categoria)
    {
       return await CuponModel.createCuponModel(email,name,porcent,f_exp,cant,foto,categoria)
    }

    static async updateCuponController(code_cupon,nombre_cupon, porcetaje_descuento,
                                  fecha_expiracion, cant_cupon){
        return await  CuponModel.updateCuponModel(code_cupon,nombre_cupon, porcetaje_descuento,
            fecha_expiracion, cant_cupon)
    }

    static async staticCuponVendidoController(email){
        return await CuponModel.staticCuponModelVendido(email)
    }

    static async staticCuponOcupadoController(email){
        return await CuponModel.staticCuponModelOcupado(email)
    }
}

module.exports = CuponController