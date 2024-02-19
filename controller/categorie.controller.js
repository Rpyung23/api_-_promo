const CategorieModel = require("../model/categorie.model")
class CategorieController
{
    static async readCategorieController(){
        return await CategorieModel.readCategorieModel()
    }

    static async createCategorieController(detalle){
        return await CategorieModel.createCategorieModel(detalle)
    }
}

module.exports = CategorieController