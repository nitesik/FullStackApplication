import db from "../db/db";

class UserRepository {
  async createUser(firstName: string, lastName: string, gender: string, email: string, password: string, country: string, city: string, zip: number, interest: string[], picture: Blob) {
    try {
      return await db("Users").insert({
        first_name: firstName,
        last_name: lastName,
        gender,
        email,
        password,
        country,
        city,
        zip,
        interest,
        picture
      }).returning("*");


    } catch(error) {
      console.log("From repository", error);
      
    }
  }

  async getAllUsers() {
    try {
      return await db.select("*").from("Users");
    } catch (error) {
      console.log(error);
    }
  }
}

// export default new UserRepository();
module.exports = new UserRepository();
