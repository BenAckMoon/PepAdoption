const { ObjectId } = require("mongodb");

let pets;

module.exports = {
  async injectDB(conn) {
    if (pets) {
      return;
    }
    try {
      pets = await conn.collection('pets');
    } catch (e) {
      console.error(`not established collection on userDAO: ${e}`);
    }
  },

  async createPet(petData) {
    console.log(petData);
    await pets.insertOne({ ...petData });
  },

   async getPets(query) {
    return await pets.find(query).toArray();
  },

  async getPetById(petId) {
    try {
      const result = await pets.findOne({ _id: new ObjectId(petId) });
      return result;
    } catch (e) {
      console.error(`Error on user with id ${petId}, ${e}`);
      return { error: e };
    }
  },  

  async getPetByIds(myPets) {
    return await pets
      .find({
        _id: { $in: myPets.map((id) => id) },
      })
      .toArray();
  },



  async updatePetStatus(petId, adoptionStatus) {
    let petStatus = adoptionStatus;

    await petsCollection.updateOne(
      { _id: new ObjectId(petId) },{ $set: { pet_adoptionStatus: petStatus } }
    );
  },

  async updatePet(petId, petObject) {
    await pets.updateOne(
      { _id: new ObjectId(petId) }, { $set: petObject }
    );
  }
};
