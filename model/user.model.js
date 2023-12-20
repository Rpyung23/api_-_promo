const connDB = require("../config/conn")
class UserModel
{
    static async loginUsuarioModel(user,pass)
    {
        try {
            var conn  = await connDB().promise()
            var sql = "select U.email_usuario,U.nombre_usuario,U.foto_usuario from usuario as U " +
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
            var sql = "insert into usuario(email_usuario,pass_usuario,nombre_usuario,foto_usuario) " +
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

module.exports = UserModel