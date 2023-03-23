const { ObjectId } = require("mongodb");
const petDAO = require("./petDAO");

let users;

module.exports = {
  async injectDB(conn) {
    if (users) {
      return;
    }
    try {
      users = await conn.collection('users');
    } catch (e) {
      console.error(`not established collection on userDAO: ${e}`);
    }
  },

    async createUser(userData) {
      userData.created_on = new Date();
      userData.role = "user";
      userData.savedPets = [];
      userData.myPets = [];
      await users.insertOne({ ...userData });
  },

  async getUserByEmail(email) {
    try {
      const result = await users.findOne({ email });
      return result;
    } catch (e) {
      console.error(`Error occurred while retrieving user with email ${email}, ${e}`);
      return { error: e };
    }
  },

  async getUserById(userId) {
    try {
      const result = await users.findOne({ _id: new ObjectId(userId) });
      return result;
    } catch (e) {
      console.error(`Error occurred while retrieving user with id ${userId}, ${e}`);
      return { error: e };
    }
  },

  async updateUser(id, userData) {
    try {
      const user = await users.findOne({ _id: new ObjectId(id) });

      if (!user) {
        return null;
      }

      if (userData.email && userData.email !== user.email) {
        const emailInUse = await users.findOne({ email: userData.email });
        if (emailInUse) {
          return { error: "Email is already in use" };
        }
      }

      const result = await users.updateOne({ _id: new ObjectId(id) }, { $set: userData });
      return result.modifiedCount === 1 ? { ...user, ...userData } : null;
    } catch (e) {
      console.error(`Error occurred while updating user, ${e}`);
      return { error: e };
    }
  },

  //  async addLikedPetToUser(userId, petId) {
  //   const petObject = await petDAO.getPetById(petId);

  //   await users.updateOne(
  //     { _id: new ObjectId(userId.id) }, { $push: { savedPets: petObject } }
  //   );
  // },
  
    async addLikedPetToUser(id, petId) {
      try {
        const user = await user.findByIdAndUpdate(id, { $addToSet: { likedPets: petId } });
        return user;
      } catch (err) {
        return { error: err.message };
      }
    },
  
  

   async removeLikedPetFromUser(userId, petId) {
    await users.updateOne(
      { _id: new ObjectId(userId.id) },{ $pull: { savedPets: { _id: new ObjectId(petId) } } }
    );
  },

   async adoptOrFosterPet(userId, petId) {
    const petObject = await petDAO.getPetById(petId);

    await users.updateOne(
      { _id: new ObjectId(userId.id) },
      {$addToSet: { myPets: petObject._id },},
      { upsert: true }
    );
  },

   async removeAdoptedPetFromUser(userId, petId) {
    await users.updateOne(
      { _id: new ObjectId(userId.id) },{ $pull: { myPets: new ObjectId(petId) } }
    );
  },

   async getAllUsers() {
    return await users.find({}).toArray();
  }
};
