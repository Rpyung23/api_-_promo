const BusinessModel = require("../model/business.model")
class BusinessController
{
    static async createBusniessController(ruc_negocio,nombre_negocio, foto_negocio, tel_contacto, dir_negocio)
    {
        return await BusinessModel.createBussinessModel(ruc_negocio,nombre_negocio, foto_negocio, tel_contacto, dir_negocio)
    }

    static async listBusinessActiveController(){
        return await BusinessModel.listBusinessActiveModel()
    }
}

module.exports = BusinessController