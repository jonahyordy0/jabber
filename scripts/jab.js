import { createJab } from './database.js';

export async function handleNewJab(req, res) {
    const jabData = req.body;
    const author = req.user;

    try {
        const jab = await createJab(jabData, author);

        return res.redirect("/dashboard/home")

    } catch (e) {
        console.log(e)
    }
}