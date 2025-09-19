import { User } from "../models/user";


async function createUser(userData) {
    const user = new User(userData);
    await user.save();
    return user;
}

async function findByEmail(email) {
    return User.findOne({email})
}

module.exports = {
    createUser, findByEmail
}