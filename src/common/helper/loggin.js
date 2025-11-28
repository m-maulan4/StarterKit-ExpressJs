import path from "path";
import fs from "fs";
import jwt from "jsonwebtoken";
export default function loggin(req) {
  const { ip, headers, method, originalUrl } = req;
  const jwtToken = req.cookies.access_token;
  const date = new Date();
  const header = headers["user-agent"];
  const username = jwt.decode(jwtToken, process.env.ACCESS_TOKEN) ?? {
    username: "guest",
  };
  const msg = `[${ip}] - ${date.toISOString()} ${
    username.username
  } ${method} ${originalUrl} -- ${header}\n`;
  const nameFile = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
  const logDirectory = path.join("logs");
  if (!fs.existsSync(logDirectory)) {
    fs.mkdirSync(logDirectory);
  }
  fs.appendFile(path.join("logs", `${nameFile}.log`), msg, (err) => {
    if (err) {
      console.error("Gagal menulis log:", err);
    }
  });
}
