import dotenv from 'dotenv';

function loadEnv(){
    dotenv.config();
    console.log(`enviroment variable loaded`);
}

loadEnv()

export const serverConfig = {
    PORT: process.env.PORT,
}