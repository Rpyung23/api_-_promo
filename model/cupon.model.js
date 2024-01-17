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

    static async readAllCuponModel(email)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select C.code_cupon,C.nombre_cupon,C.porcetaje_descuento," +
                "convert(date(C.fecha_expiracion),char(250)) fecha_expiracion,C.cant_cupon," +
                "C.foto_cupon from cupon as C inner join usuario_negocio as NU on NU.fk_ruc_negocio = C.fk_ruc_negocio " +
                "where C.estado = 1 and NU.fk_email_usuario = '"+email+"' order by C.fecha_creacion_cupon desc"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }
}

module.exports = CuponModel