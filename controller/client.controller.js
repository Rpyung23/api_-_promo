const ClientModel = require("../model/client.model")
class ClientController
{
    static async createClientController(uid_client, name_client, dni_client, photo_client,
                                   sex_client, f_client, tel_client,pass_client)
    {
        return await ClientModel.createClientModel(uid_client, name_client, dni_client, photo_client,
            sex_client, f_client, tel_client,pass_client)
    }

    static async loginClientController(user, pass)
    {
        return await ClientModel.loginClientModel(user, pass)
    }
}

module.exports = ClientController