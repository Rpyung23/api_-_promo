const UserModel = require("../model/user.model")
class UserController
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
}

module.exports = UserController