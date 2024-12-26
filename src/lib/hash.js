import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashPassword(password) {
    try {
        const hash = await bcrypt.hash(password, saltRounds);
        return hash;
    } catch (err) {
        console.log(err);
        return { status: 'error' };
    }
}

export async function checkPassword(password, hash) {
    try {
        const match = await bcrypt.compare(password, hash);
        return match; //return true or false
    } catch (err) {
        console.log(err);
        return { status: 'error' };
    }
}