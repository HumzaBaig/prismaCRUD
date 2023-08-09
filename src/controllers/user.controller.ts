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
                include: {
                    car: true,
                },
            });

            return res.json({ user });
        } catch (error) {
            console.log(`[USER_CREATION_ERROR] ${error}`);
            return res.status(500).json({error: 'An error occurred while creating the user.'});
        }
    },

    async findUser(req: Request, res: Response) {
        const paramId = req.params.id;

        if(!paramId) {
            console.log("There is no id in params")
            return res.status(401).json({error: 'Make sure there is an id in the params of your request.'})
        }

        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: paramId,
                }
            });

            if(!user) {
                console.log("There is no user with that id")
                return res.status(403).json({error: 'Make sure the id in your request params is correct.'})
            }

            return res.json({ user });
            
        } catch (error) {
            console.log(`[SINGLE_USER_FIND_ERROR] ${error}`);
            return res.status(500).json({error: 'An error occured while searching for the user.'})
        }
    }
}