const UserModel = require("../model/vendedor.model")
class VendedorController
{
    static async loginUserController(user,pass)
    {
        return await UserModel.loginUsuarioModel(user,pass)
    }

    static async createUsuarioController(email,pass,name,photo)
    {
        return await UserModel.createUsuarioModel(email,pass,name,photo)
    }

    static async assignUsuarioBusinessController(user,business)
    {
        return await UserModel.assignUsuarioBusinessModel(user,business)
    }

    static async readProfileUsuarioController(email){
        return await UserModel.readProfileUsuarioModel(email);
    }
}

module.exports = VendedorController