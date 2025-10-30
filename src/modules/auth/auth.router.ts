import { Router } from "express";
import authControllers from "./auth.controllers.js";

const router: Router = Router()
router.post("/post", authControllers.register)

export default router