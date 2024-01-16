const connDB = require("../config/conn");

class CuponModel
{
    static async createCuponModel(email,name,porcent,f_exp,cant,foto)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into cupon(fk_ruc_negocio, nombre_cupon, porcetaje_descuento," +
                "fecha_creacion_cupon, fecha_expiracion, cant_cupon, disponible_cupon," +
                "estado, foto_cupon) VALUES ((select UN.fk_ruc_negocio from usuario_negocio as UN " +
                "where UN.fk_email_usuario = '"+email+"'),'"+name+"',"+porcent+",date(now()),'"+f_exp+"',"+cant+","+cant+",1,'"+foto+"')"
            await conn.query(sql)
            await connDB().end()
            return {estado:true,msm:"ok"}
        }catch (e) {
            console.log(e)
            return {estado:false,msm:e.toString()}
        }
    }
}

module.exports = CuponModel