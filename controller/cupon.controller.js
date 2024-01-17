const CuponModel = require("../model/cupon.model")
class CuponController
{
    static async readAllCuponController(email){
        return await CuponModel.readAllCuponModel(email)
    }
    static async createCuponController(email,name,porcent,f_exp,cant,foto)
    {
       return await CuponModel.createCuponModel(email,name,porcent,f_exp,cant,foto)
    }
}

module.exports = CuponController