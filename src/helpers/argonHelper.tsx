import * as argon2 from "argon2";

export async function hashPassword(password:string) {

    if (!process.env.ARGP) {
        throw new Error("The environment variable has not been set.")
    }

    const secret = Buffer.from(process.env.ARGP, 'utf-8');

    try {
        const hashedPassword = await argon2.hash(password, { memoryCost: 2 ** 19, secret })
        return hashedPassword

    }catch (error) {
        throw new Error("Your token is expired");
    }
}

export async function verifyPassword(userPassword: string, password:string) {

    if (!process.env.ARGP) {
        throw new Error("The environment variable has not been set.")
    }

    const secret = Buffer.from(process.env.ARGP)

    try {
        return await argon2.verify(userPassword, password, { memoryCost: 2 ** 19, secret })
    } catch(err) {
        throw new Error("Invalid credentials")
    }
    
}