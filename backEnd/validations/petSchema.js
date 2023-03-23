const Ajv = require("ajv");
const ajv = new Ajv();

module.exports.addPetValidation = ajv.compile({
  type: "object", properties: {
    pet_type: { type: "array",
      items: {
        type: "string",
        enum: [ "Dogs","Cats" ],}, },
    pet_name: { type: "string" },
    pet_adoptionStatus: {
      type: "array",
      items: {
        type: "string",
        enum: ["Adopted", "Looking for home", "Foster"],
      },
    },
    pet_height: { type: "number" },
    pet_weight: { type: "number" },
    pet_color: { type: "string" },
    pet_bio: { type: "string"},
    pet_hypoallergenic: { type: "boolean" },
    pet_dietary: { type: "string" },
    pet_breed: { type: "string" },
  },

  required: 
  ["pet_type", 
  "pet_name", 
  "pet_breed"],
});
