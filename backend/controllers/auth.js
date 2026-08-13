import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../database/database.js";
import { JWT_SECRET } from "../config/env.js";

function createToken(userId) {
  return jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: "2h" });
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function signup(req, res) {
  const { name, email, password } = req.body || {};

  if (!name?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      message: "Please complete all required fields."
    });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (cleanName.length < 2) {
    return res.status(400).json({
      message: "Please enter your full name."
    });
  }

  if (!validEmail(cleanEmail)) {
    return res.status(400).json({
      message: "Please enter a valid email address."
    });
  }

  if (
    password.length < 8 ||
    !/[A-Z]/.test(password) ||
    !/[a-z]/.test(password) ||
    !/[0-9]/.test(password)
  ) {
    return res.status(400).json({
      message: "Password must be 8+ characters with uppercase, lowercase and a number."
    });
  }

  const existing = db
    .prepare("SELECT id FROM users WHERE email = ?")
    .get(cleanEmail);

  if (existing) {
    return res.status(409).json({
      message: "That email is already registered. Please sign in instead."
    });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 12);

    const result = db
      .prepare(
        "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)"
      )
      .run(cleanName, cleanEmail, passwordHash);

    const user = {
      id: Number(result.lastInsertRowid),
      name: cleanName,
      email: cleanEmail
    };

    return res.status(201).json({
      message: "Account created successfully.",
      user,
      token: createToken(user.id)
    });
  } catch {
    return res.status(500).json({
      message: "We could not create the account. Please try again."
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body || {};

  if (!email?.trim() || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  const cleanEmail = email.trim().toLowerCase();

  const record = db
    .prepare("SELECT * FROM users WHERE email = ?")
    .get(cleanEmail);

  if (!record) {
    return res.status(401).json({
      message: "No account was found for this email. Create an account first."
    });
  }

  const passwordMatches = await bcrypt.compare(
    password,
    record.password_hash
  );

  if (!passwordMatches) {
    return res.status(401).json({
      message: "The password you entered is incorrect."
    });
  }

  const user = {
    id: record.id,
    name: record.name,
    email: record.email
  };

  return res.json({
    message: "Signed in successfully.",
    user,
    token: createToken(user.id)
  });
}

export function currentUser(req, res) {
  return res.json({ user: req.user });
}
