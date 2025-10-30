import buildServer from "./app.js";
const server = buildServer();
const listenServer = () => {
    const PORT = process.env.PORT || 3000;
    try {
        server.listen({ port: PORT, host: "0.0.0.0" }, () => {
            console.log(`${new Date()}`);
            console.log(`Server listen on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log(`Error in ${error}`);
        process.exit(1);
    }
};
listenServer();
