const app = require("./app");
const conectarDb = require("./config/db");
// conecta la bd
conectarDb();

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Servidor levantado en el puerto ${port}`));
