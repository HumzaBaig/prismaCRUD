import { Router } from "express";
import { userController } from "../controllers/user.controller";

const routes = Router();

routes.get("/", userController.index);
routes.post("/", userController.create);

export default routes;