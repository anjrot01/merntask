const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
  nombre: {
    type: String,
    require: true,
    trim: true
  },
  estado: {
    type: Boolean,
    default: false
  },
  creado: {
    type: Date,
    default: Date.now()
  },
  proyecto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "proyecto"
  }
});

module.exports = mongoose.model("tarea", TareaSchema);
