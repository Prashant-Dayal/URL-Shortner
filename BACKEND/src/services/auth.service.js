import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user.dao.js"
import { ConflictError } from "../utils/errorHandler.js"
import {signToken} from "../utils/helper.js"

export const registerUser = async (name, email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await findUserByEmail(normalizedEmail)
    if(user) throw new ConflictError("User already exists")
    const newUser = await createUser(name, normalizedEmail, password)
    const token = await signToken({id: newUser._id})
    return {token,user}
}

export const loginUser = async (email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const user = await findUserByEmailByPassword(normalizedEmail)
    if(!user) throw new Error("Invalid email or password")

    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid) throw new Error("Invalid email or password")
    const token = signToken({id: user._id})
    return {token,user}
}

