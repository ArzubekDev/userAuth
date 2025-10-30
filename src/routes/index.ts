import { Router } from "express";
import cors from "cors"
import authRouter from "../modules/auth/auth.router.js"
const globalRouter: Router = Router()

const corsConfig = {
    origin: ["http://localhost:3000"]
}
globalRouter.use("/auth", cors(corsConfig), authRouter)

export default globalRouter