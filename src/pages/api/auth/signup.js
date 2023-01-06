import connectMongo from "../../../../database/conn";
import Users from "../../../../model/schema";
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  connectMongo().catch((err) => res.json({ error: "Connection Failed" }));

  // only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  } else {
    if (!req.body) {
      return res.status(400).json({ error: "Bad Request" });
    }
    const { username, email, password } = req.body;

    // check duplicate username
    const checkexisting = await Users.findOne({ email });
    if (checkexisting) {
      return res.status(400).json({ error: "Email already exists" });
    }

    //
    Users.create(
      {
        username,
        email,
        password: await hash(password, 12),
      },
      function (err, data) {
        if (err) return res.status(400).json({ error: "Bad Request" });
        return res.status(200).json({ status: true, user: data });
      }
    );
  }
}
