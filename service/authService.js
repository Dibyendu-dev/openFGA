import { JsonWebTokenError as jwt } from "jsonwebtoken";
import { createUser,findByEmail} from '../repository/user.repository';

function signToken(userId) {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {
            expireIn: process.env.JWT_EXPIRES_IN || '1h',
            issuer: process.env.JWT_ISSUER || 'openfga',
            audience: process.env.JWT_AUDIENCE || 'openfga-clients',
        }
    )
}

async function register(userData) {
    const user = await createUser(userData);
    const token = signToken(user._id)
    return {
        user, token
    }
}

async function login({email,password}) {
    const user = await findByEmail(email);
    const ok = user && (await user.comparePassword(password))
    if(!ok){
        throw new Error('Invalid email and password')
    }
    const token = signToken(user._id)
    return { user, token}
}

module.exports = {login,register}