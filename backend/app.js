import express from "express";
// import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import postRoute from "./routes/post.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
const port = 8800;
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
