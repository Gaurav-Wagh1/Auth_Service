const {Role} = require('../models/index');

class RoleRepository{
    async getByName(roleName){
        try {
            const role = await Role.findOne({
                where:{
                    name: roleName
                }
            });
            return role;
        } catch (error) {
            console.log("Something wrong at role repository layer !");
        }
    }
}

module.exports = RoleRepository;