import bcrypt from "bcryptjs";
import prisma from "../../config/prisma.js";
import generateToken from "../../config/token.js";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        const token = generateToken(user.id, user.email);
        res.status(202).json({
            success: true,
            token,
        });
    }
    catch (error) {
        res.status(502).json({
            success: false,
            error: `Error in register ${error}`,
        });
    }
};
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res
                .status(401)
                .json({ success: false, message: "Invalid credentials" });
        }
        const token = generateToken(user.id, user.email);
        res.status(200).json({
            success: true,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: `Error in login: ${error}`,
        });
    }
};
export default {
    register,
    login
};
