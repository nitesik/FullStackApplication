// import UserService from "../service/user";

const User = require("../service/user");

class UserController {
  async createUser(req: any, res: any) {
    try {
      console.log(req.body);
      
      const data = await User.createUser(req.body);
      res.status(200).json(data);

    } catch (error) {
      console.error(error);
      res.status(400).json(error);
      
    }
    
  }

  async getAllUsers(req:any, res: any) {
    try {
      const data = await User.getAllUsers();
      res.status(200).json(data);
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
    }
  }
}

module.exports = new UserController();