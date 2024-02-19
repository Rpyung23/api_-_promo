const connDB = require("../config/conn")
class VendedorModel
{

    static async readProfileUsuarioModel(email)
    {
        try {
            var sql = "select U.nombre_usuario name_cliente,U.foto_usuario foto_cliente," +
                "U.email_usuario uid_cliente from vendedor as U where U.email_usuario = '"+email+"'"
            var conn = await connDB().promise()
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
            return null
        }
    }
    static async loginUsuarioModel(user,pass)
    {
        try {
            var conn  = await connDB().promise()
            var sql = "select U.email_usuario as email,U.nombre_usuario as name,U.foto_usuario as foto from vendedor as U " +
                "where U.email_usuario = '"+user+"' and U.pass_usuario = MD5('"+pass+"') and activo = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
        }

        return null
    }

    static async createUsuarioModel(email,pass,name,photo)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into vendedor(email_usuario,pass_usuario,nombre_usuario,foto_usuario) " +
                "values ('"+email+"',MD5('"+pass+"'),'"+name+"','"+photo+"')"
            var data = await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }

    static async assignUsuarioBusinessModel(user,business)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into usuario_negocio (fk_email_usuario, fk_ruc_negocio) values ('"+user+"','"+business+"')"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }
}

module.exports = VendedorModel