import bcrypt from 'bcryptjs' // "bcryptjs" is a package that provides bcrypt hashing functions

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}
export const passwordCheck = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}
