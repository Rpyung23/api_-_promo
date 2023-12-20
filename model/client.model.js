const connDB = require("../config/conn")
class ClientModel
{
    static async createClientModel(uid_client, name_client, dni_client, photo_client,
                                   sex_client, f_client, tel_client,pass_client)
    {
        try {
            var conn = await connDB().promise()
            var sql = "insert into cliente(uid_cliente, name_cliente, dni_cliente, foto_cliente," +
                "sexo_cliente, fecha_nacimiento_cliente, tel_cliente,pass_cliente) values ('"+uid_client+"','"+name_client+"'," +
                "'"+dni_client+"','"+photo_client+"','"+sex_client+"','"+f_client+"','"+tel_client+"',MD5('"+pass_client+"'))"
            await conn.query(sql)
            await conn.end()
            return true
        }catch (e) {
            console.log(e)
        }
        return false
    }

    static async loginClientModel(user, pass)
    {
        try {
            var conn = connDB().promise()
            var sql = "select C.uid_cliente,C.name_cliente,C.foto_cliente from cliente as C " +
                "where C.uid_cliente = '"+user+"' and C.pass_cliente = MD5('"+pass+"') and C.activo = 1"
            var data = await conn.query(sql)
            await conn.end()
            return data[0][0]
        }catch (e) {
            console.log(e)
        }
        return null
    }


}

module.exports = ClientModel