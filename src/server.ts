import app from './app';
import dotenv from "dotenv"

//load env variables
dotenv.config()

const PORT = process.env.PORT;

app.listen(PORT, () => {

  console.log(`Server running on port ${PORT}`);

});
