import { Request, Response } from "express";

import prisma from "../services/prisma";

export const userController = {
    async index(req: Request, res: Response) {
        const users = await prisma.user.findMany();
        return res.json(users);
    },

    async create(req: Request, res: Response) {
        const userData = req.body;

        try {
            const user = await prisma.user.create({
                data: {
                    fname: userData.fname,
                    lname: userData.lname,
                },
            });

            return res.json({ user });
        } catch (error) {
            console.log(`[USER_CREATION_ERROR] ${error}`);
            return res.status(500).json({error: 'An error occurred while creating the user.'});
        }
    }
}