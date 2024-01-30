const CuponModel = require("../model/cupon.model")
class CuponController
{
    static async readAllCuponClientController()
    {
        return await CuponModel.readAllCuponClientModel();
    }
    static async readAllCuponController(email){
        return await CuponModel.readAllCuponModel(email)
    }
    static async createCuponController(email,name,porcent,f_exp,cant,foto)
    {
       return await CuponModel.createCuponModel(email,name,porcent,f_exp,cant,foto)
    }

    static async updateCuponController(code_cupon,nombre_cupon, porcetaje_descuento,
                                  fecha_expiracion, cant_cupon){
        return await  CuponModel.updateCuponModel(code_cupon,nombre_cupon, porcetaje_descuento,
            fecha_expiracion, cant_cupon)
    }
}

module.exports = CuponController