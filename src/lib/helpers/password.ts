import Argon2id from "argon2"

export const verifyPassword = (oldPassword: string, newPassword: string): Promise<boolean> => {
    return Argon2id.verify(oldPassword, newPassword)
}

export const hashPassword = (password: string): Promise<string> => {
    return Argon2id.hash(password)
}