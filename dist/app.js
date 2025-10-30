import "dotenv/config";
import express from "express";
const buildServer = () => {
    const server = express();
    server.use(express.json());
    server.get("/", (req, res) => {
        res.status(200).json({
            success: true,
        });
    });
    return server;
};
export default buildServer;
//# sourceMappingURL=app.js.map