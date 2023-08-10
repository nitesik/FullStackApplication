// import UserRepository from "../repository/user";

const UserRepository = require("../repository/user");

class UserService {
  async createUser({ firstName, lastName, gender, email, password, country, city, zip, interest, picture } : {firstName: string, lastName: string, gender: string, email: string, password: string, country: string, city: string, zip: number, interest: string[], picture: Buffer }) {
    try {
      return await UserRepository.createUser(firstName, lastName, gender, email, password, country, city, zip, interest, picture);
    } catch (error) {
      console.log("From service: ", error);
      
    }
  }

  async getAllUsers() {
    return await UserRepository.getAllUsers();
  }
}

// export default new UserService();

module.exports = new UserService();