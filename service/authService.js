import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createUser, findByEmail } from "../repository/user.repository.js";

function signToken(userId) {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    issuer: process.env.JWT_ISSUER || "openfga",
    audience: process.env.JWT_AUDIENCE || "openfga-clients",
  });
}

async function registerService(userData) {
  const user = await createUser(userData);
  const token = signToken(user._id);
  return {
    user,
    token,
  };
}

async function loginService({ email, password }) {
  const user = await findByEmail(email);
  if (!user) {
    throw new Error("Invalid email and password");
  }
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) {
    throw new Error("Invalid email and password");
  }
  const token = signToken(user._id);
  return { user, token };
}

export { loginService, registerService };
