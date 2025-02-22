//  Add your code here
const { Schema, model } = require("mongoose");

const celebritySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    catchPhrase: {
      type: String,
      required: true,
    },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Celebrity = model("Celebrity", celebritySchema);

module.exports = Celebrity;
