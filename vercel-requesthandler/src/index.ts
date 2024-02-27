import express from "express";
import { S3 } from "aws-sdk";

const app = express();

app.get("/*", async (req, res) => {
    const host = req.hostname;
    console.log(host);
    const id = host.split(".")[0];
    console.log(id);
    const filePath = req.path;
    console.log(filePath)

})

app.listen(3001)