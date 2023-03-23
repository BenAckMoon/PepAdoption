const petDAO = require("../dao/petDAO");
const userDAO = require("../dao/userDAO");
const { RegisterValidation, LoginValidation, UpdateValidation, } = require("../validations/userSchema");

const sha256 = require("js-sha256");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const isValid = RegisterValidation(req.body);
    if (!isValid) {
      return res.status(400).send({
        success: false,
      });
    }
    const userObject = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      mobile: req.body.mobile,
      email: req.body.email,
      password: req.body.password,
    };

    const exisitingUser = await userDAO.getUserByEmail(userObject.email);

    if (exisitingUser) {
      return res.status(400).json({
        success: false,
        message: "already existing an account with this email. Please try again!",
      });
    }

    userObject.password = sha256(userObject.password);

    await userDAO.createUser(userObject);
    return res
      .status(200).json({
        success: true,
        message: "New account created. You can log in"
      });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      success: false,
      message: "unknown error",
    });
  }
};

const login = async (req, res) => {
  try {
    const isValid = LoginValidation(req.body);

    if (!isValid) {
      return res
        .status(400).send({ success: false, message: "All fields are required !" });
    }
    const userObject = {
      email: req.body.email,
      password: req.body.password,
    
    };
    const exisitingUser = await userDAO.getUserByEmail(userObject.email);

    if (exisitingUser.password != sha256(req.body.password)) {
      return res.status(400).send({
        success: false,
        message: "Wrong password.",
      });
    } else {
      const token = jwt.sign(
        { user_id: exisitingUser._id },
        process.env.JWT_SECERET
      );

      return res.status(200).send({
        success: true,
        message: "successful login.",
        token: token,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error. Account does not match ",
    });
  }
};

// const getUserProfile = async (req, res) => {
//   try {
//     return res.status(200).send({
//       success: true, user: req.currentUser,
//     });
//   } catch (error) {
//     return res.status(400).send({
//       success: false,
//       message: error,
//     });
//   }
// };

const updateUserProfile = async (req, res) => {
  try {
    const isValid = UpdateValidation(req.body);

    if (isValid) {
      const userObject = req.body;
      await userDAO.updateUser(req.params, userObject);
      return res.status(200).send({
        success: true,
        message: "Profile updated",
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "update not valid",
      });
    }
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};

// const savePetToUserProfile = async (req, res) => {
//   try {
//     const savePetId = req.params.id;
//     const currentUser = await userDAO.getUserById(req.currentUser._id);
//     const foundPetId = currentUser.savedPets.some(
//       (pet) => pet._id == savePetId
//     );

//     if (foundPetId) {
//       await userDAO.removeLikedPetFromUser(
//         req.currentUser._id,
//         req.params.id
//       );
//       return res.status(400).send({
//         success: true,
//         message: "This pet already added and needs to be removed",
//       });
//     } else {
//       await userDAO.addLikedPetToUser(req.currentUser._id, req.params.id);

//       return res.status(200).send({
//         success: true,
//         message: "Pet added",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).send({
//       success: false,
//       message: error,
//     });
//   }
// };


const savePetToUserProfile = async (req, res) => {
  const { id } = req.body; 
  const { petId } = req.body;

  try {
    const user = await userDAO.getUserById(id);
    const pet = await petDAO.getPetById(petId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    if (!pet) {
      return res.status(404).json({ success: false, message: "Pet not found" });
    }
    const result = await userDAO.addLikedPetToUser(id, petId);

    if (result.error) {
      return res.status(500).json({ success: false, message: "An error occurred while saving to user" });
    }
    res.json({ success: true, message: "Pet saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "An error occurred while processing your request" });
  }
};



const adoptOrFosterAPet = async (req, res) => {
  try {
    const petId = req.params.id;
    const adoptionStatus = req.body.status;
    await petDAO.updatePetStatus(petId, adoptionStatus);

    const currentUser = await userDAO.getUserById(req.currentUser._id);

    if (adoptionStatus !== "Looking for home") {
      let foundPetIdSavedPets;

      if (currentUser.myPets) {
        foundPetIdSavedPets = currentUser.savedPets.some(
          (pet) => pet._id == petId
        );
      }
      if (foundPetIdSavedPets) {
        await userDAO.removeLikedPetFromUser(
          req.currentUser._id,
          req.params.id
        );
      }
      await userDAO.adoptOrFosterPet(req.currentUser._id, petId);

    } else {
      await userDAO.removeAdoptedPetFromUser(req.currentUser._id, petId);
      return res.status(200).send({
        success: true, message: `Pet removed `,
      });
    }
    return res.status(200).send({
      success: true,
      message: `Congrats: ${adoptionStatus} `,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: error,
    });
  }
};

const getAllUsersFromDB = async (req, res) => {
  try {
    const results = await userDAO.getAllUsers();
    return res.status(200).send({
      success: true,
      message: results,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: `Error getting user - ${error}`,
    });
  }
};

module.exports = {
  register, login, getAllUsersFromDB,
  adoptOrFosterAPet, savePetToUserProfile, updateUserProfile
};
