const connDB = require("../config/conn")
class BusinessModel
{
    static async createBussinessModel(ruc_negocio,nombre_negocio, foto_negocio, tel_contacto, dir_negocio)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into negocio(ruc_negocio,nombre_negocio, foto_negocio, tel_contacto, dir_negocio) " +
                "values ('"+ruc_negocio+"','"+nombre_negocio+"','"+foto_negocio+"','"+tel_contacto+"','"+dir_negocio+"')"
            await conn.query(sql)
            await conn.end()
            return  true
        }catch (e) {
            console.log(e)
        }
        return false
    }

    static async listBusinessActiveModel()
    {
        try{
            var conn = await connDB().promise()
            var sql = "select N.ruc_negocio,N.nombre_negocio,N.foto_negocio,N.tel_contacto," +
                "N.dir_negocio from negocio as N where N.activo = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
        }
        return []
    }
}

module.exports = BusinessModel