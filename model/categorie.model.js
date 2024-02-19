const connDB = require("../config/conn")
class CategorieModel
{
    static async readCategorieModel()
    {
        try {
            var conn = await connDB().promise()
            var data = await conn.query("select C.id_categoria,C.detalle_categoria from categoria as C")
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async createCategorieModel(detalle){
        try {
            var conn = await connDB().promise()
            var sql = "insert into categoria(detalle_categoria) values ('"+detalle+"')"
            await conn.query(sql)
            await conn.end()
            return {estado:true,msm:'OK'}
        }catch (e) {
            return {estado:false,msm:e.toString()}
        }
    }
}

module.exports = CategorieModel