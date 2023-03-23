const petDAO = require("../dao/petDAO");
const userDAO = require("../dao/userDAO");

// const createPet = async (req, res) => {
//   try {
//     const petObject = req.body;
//     petObject.petImage = req.petImage;

//     await petDAO.createPet(petObject);

//     return res.status(200).json({ success: true, message: "New pet added." });
//   } catch (e) {
//     console.log(`Error ,${e}`);
//     return res.status(500).json({
//       success: false, message: "Error on creating pet.",
//     });
//   }
// };

const createPet = async (req, res) => {
  try {

    const petObject = {
      name: req.body.name,
      type: req.body.type,
      adoptionStatus: req.body.adoptionStatus,
      image: req.image,
      height: req.body.height,
      weight: req.body.weight,
      color: req.body.color,
      bio: req.body.bio,
      hypoallergenic: req.body.hypoallergenic,
      dietary: req.body.dietary,
      breed: req.body.breed,
      created_on: new Date()
    };

    await petDAO.createPet(petObject);

    return res.status(200).json({ success: true, message: "New pet added." });
  } catch (e) {
    console.log(`Error ,${e}`);
    return res.status(500).json({
      success: false, message: "Error on creating pet.",
    });
  }
};

const getPets = async (req, res) => {
  const params = req.body;
  const query = {};

  if (params.petType) { query.pet_type = params.petType; }
  if (params.petStatus) {query.pet_adoptionStatus = params.petStatus; }
  if (params.petName) {query.pet_name = params.petName;}
  if (params.petHeight) {query.pet_height = params.petHeight;}
  if (params.petWeight) {query.pet_weight = params.petWeight;}
  console.log(query);
  try {
    const results = await petDAO.getPets(query);
    console.log(results);
    return res.status(200).json({
      results,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const getPetById = async (req, res) => {
  const petId = req.body.id;
  const pet = await petDAO.getPetById(petId);
  if (pet) {
    res.json({ success: true, pet });
  } else {
    res.status(404).json({ success: false, message: "Pet not found" });
  }
};

const getPetIds = async (req, res) => {
  const idArray = req.currentUser.myPets;
  try {
    const response = await petDAO.getPetByIds(idArray);
    return res.status(200).json({
      success: true, message: response,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false, message: "Pet was not found.",
    });
  }
};

const updatePetObject = async (req, res) => {
  try {
    const currentUser = await userDAO.getUserById(req.currentUser._id);
    const petId = req.params.id;
    const petObject = req.body;
    console.log(petId, petObject);

    if (currentUser.role !== "admin") {
      return res.status(403).json({
        success: false, error: "The user not admin and can't doing update.",
      });
    }

    try {
      await petDAO.updatePet(petId, petObject);
      console.log("The user is admin");
      return res.status(200).json({
        success: true, message: "The pet was updated successfully.",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false, error: "An error happened on updating of pet .",
      });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false, error,
    });
  }
};

module.exports = {
  createPet, updatePetObject, getPetIds, getPetById, getPets
};

