const Ajv = require("ajv");
const ajv = new Ajv();

const RegisterValidation = ajv.compile({
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    mobile: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    userBio: { type: "string" },
  },
  required: ["firstName", "lastName", "email", "password"],
  additionalProperties: false,
});

const LoginValidation = ajv.compile({
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
});

const UpdateValidation = ajv.compile({
  type: "object",
  properties: {
    firstName: { type: "string", minLength: 1 },
    lastName: { type: "string", minLength: 1 },
    mobile: { type: "string" },
    email: { type: "string" },
    userBio: { type: "string" },
  },
  required: ["firstName", "lastName", "email"],
  additionalProperties: false,
});


module.exports={RegisterValidation, LoginValidation, UpdateValidation}