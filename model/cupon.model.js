const connDB = require("../config/conn");

class CuponModel
{

    static async readAllCuponClientModel()
    {
        try {
            var conn = await connDB().promise()
            var sql = "select C.code_cupon,C.nombre_cupon,convert(date(C.fecha_expiracion),char(250)) as " +
                "fecha_expiracion,C.disponible_cupon,C.foto_cupon from cupon as C where C.estado = 1 and C.disponible_cupon > 0 " +
                "and date(now()) <= date(C.fecha_expiracion);"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async readAllCuponClientCategoryModel(categoria)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select C.code_cupon,C.nombre_cupon,convert(date(C.fecha_expiracion),char(250)) as " +
                "fecha_expiracion,C.foto_cupon,C.disponible_cupon from cupon as C where C.estado = 1 and C.disponible_cupon > 0 " +
                "and date(now()) <= date(C.fecha_expiracion) and id_tipo_categoria = '"+categoria+"'"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async createCuponModel(email,name,porcent,f_exp,cant,foto,categoria)
    {
        try{
            var conn = await connDB().promise()
            var sql = "insert into cupon(fk_email_user, nombre_cupon, porcetaje_descuento," +
                "fecha_creacion_cupon, fecha_expiracion, cant_cupon, disponible_cupon," +
                "estado, foto_cupon,id_tipo_categoria) VALUES ('"+email+"','"+name+"',"+porcent+",date(now()),'"+f_exp+"',"+cant+","+cant+",1,'"+foto+"',"+categoria+")"
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
                "convert(date(C.fecha_expiracion),char(250)) fecha_expiracion,C.cant_cupon,C.disponible_cupon," +
                "C.foto_cupon from cupon as C where C.estado = 1 and C.fk_email_user = '"+email+"' order by C.fecha_creacion_cupon desc"
            var data = await conn.query(sql)
            await conn.end()
            return data[0]
        }catch (e) {
            console.log(e)
            return []
        }
    }

    static async updateCuponModel(code_cupon,nombre_cupon, porcetaje_descuento,
                                  fecha_expiracion, cant_cupon,categoria)
    {
        try {
            var conn = await connDB().promise()
            var sql = "update cupon set id_tipo_categoria = '"+categoria+"', nombre_cupon = '"+nombre_cupon+"', porcetaje_descuento = "+porcetaje_descuento+"," +
                "fecha_expiracion = '"+fecha_expiracion+"', cant_cupon = "+cant_cupon+" where code_cupon = "+code_cupon
            console.log(sql)
            await conn.query(sql)
            await conn.end()
            return {estado:true,msm:"OK"}
        }catch (e) {
            console.log(e)
            return {estado:false,msm:e.toString()}
        }
    }

    static async consumirCuponModel(user,code_cupon)
    {
        try {
            var conn = connDB().promise()
            var sql = "call checkValidaCuponUserOcupado('"+user+"',"+code_cupon+")";
            var sql_2 = "insert into cupon_cliente(fk_code_cupon, fk_uid_cliente) " +
                "VALUES ("+code_cupon+",'"+user+"')"
            console.log(sql)
            console.log(sql_2)
            var dataProcedure = await conn.query(sql)

            if(dataProcedure[0][0][0].respuesta == 200)
            {
                await conn.query(sql_2)
                return {code:200,msm:"CUPON OCUPADO CON EXITO"}
            }
            await conn.end()
            return {code:300,msm:"CUPON YA ESTA OCUPADO"}
        }catch (e) {
            console.log(e.toString())
            return {code:400,msm:e.toString()}
        }
    }


    static async staticCuponModelVendido(email)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select table1.*,(table1.cant_cupon_vn+table1.disponible_cupon_vn) tot_vn from " +
                "(select sum(C.cant_cupon - disponible_cupon) cant_cupon_vn,sum(C.disponible_cupon) disponible_cupon_vn " +
                "from cupon as C where date(now()) > date(C.fecha_expiracion) and " +
                "C.fk_email_user = '"+email+"') as table1;"
            console.log(sql)
            var data = await conn.query(sql)
            await conn.end()
            if(data[0].length > 0){
                data[0][0].disponible_cupon_vn = parseFloat(data[0][0].disponible_cupon_vn == null ? 0 : data[0][0].disponible_cupon_vn)
                data[0][0].cant_cupon_vn = parseFloat(data[0][0].cant_cupon_vn  == null ? 0 : data[0][0].cant_cupon_vn)
            }
            return data[0][0]
        }catch (e) {
            return null
        }
    }

    static async staticCuponModelOcupado(email)
    {
        try {
            var conn = await connDB().promise()
            var sql = "select table1.*,(table1.cant_cupon_ocp+table1.disponible_cupon_ocp) tot_ocp from " +
                "(select sum(C.cant_cupon - disponible_cupon) cant_cupon_ocp,sum(C.disponible_cupon) disponible_cupon_ocp " +
                "from cupon as C where date(now()) <= date(C.fecha_expiracion) and " +
                "C.fk_email_user = '"+email+"') as table1;"
            var data = await conn.query(sql)
            await conn.end()

            if(data[0].length > 0){
                data[0][0].cant_cupon_ocp = parseFloat(data[0][0].cant_cupon_ocp == null ? 0 : data[0][0].cant_cupon_ocp)
                data[0][0].disponible_cupon_ocp = parseFloat(data[0][0].disponible_cupon_ocp == null ? 0 : data[0][0].disponible_cupon_ocp)
            }

            return data[0][0]
        }catch (e) {
            return null
        }
    }


}

module.exports = CuponModel