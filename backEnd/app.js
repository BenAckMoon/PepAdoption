require("dotenv").config();
const express = require("express");
const { initDB } = require("./dao/init");
initDB();
const UsersController = require("./controllers/userController");
const PetsController = require("./controllers/petController");
const { S3PetUploadMiddleware } = require("./middlewares/awsUpload");

const { AuthMiddleware, RoleCheckerMiddleware, ValidatePetObjectMiddleware,
} = require("./middlewares/auth");


const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const multer = require("multer");
const storage = multer.memoryStorage({});
const upload = multer({ storage: storage });

// checked
app.post("/register", UsersController.register); 
// checked
app.post("/login", UsersController.login);
// checked
app.get("/users",UsersController.getAllUsersFromDB);
  // app.get("/users", [AuthMiddleware, RoleCheckerMiddleware],
  // UsersController.getAllUsersFromDB);
// app.get("/user", UsersController.getUserProfile);
// checked
app.put("/user/:id", UsersController.updateUserProfile);

app.post("/pet/save", UsersController.savePetToUserProfile);
app.post("/pet/:id/adopt",  UsersController.adoptOrFosterAPet);

// check - for SearchPage
app.post("/pet", PetsController.getPets);

// checked 
app.get("/pet/id", PetsController.getPetById);

app.get("/user/:id/mypets",  PetsController.getPetIds);

app.put("/pet/:id", AuthMiddleware, PetsController.updatePetObject);

app.post("/pet/create", PetsController.createPet);
    // app.post("/pet/create",[upload.single("image"), AuthMiddleware, RoleCheckerMiddleware,
    // ValidatePetObjectMiddleware, S3PetUploadMiddleware,],PetsController.createPet);


app.listen(3002, async () => {
  console.log("Server is running on port 3002");
});
