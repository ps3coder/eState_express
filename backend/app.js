import express from "express";
import cors from "cors";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";
import testRoute from "./routes/test.route.js";
const app = express();
const corsOrigin = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOrigin));
const port = 8800;
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
