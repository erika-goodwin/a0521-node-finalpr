import express from "express";
const router = express.Router();
import { body, validationResult } from "express-validator";
import User from "../models/user.model";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import checkAuth from "../middleware/checkAuth";

router.post(
  "/signup",
  body("email").isEmail().withMessage("The mail is invalid"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("The password is too short"),
  async (req, res) => {
    //(1) Validate the email and password
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors.array().map((error) => {
        return {
          msg: error.msg,
        };
      });
      return res.json({ errors });
    }

    //(2) Check if email is not already used
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({
        errors: [{ msg: "Email already in use" }],
        data: null,
      });
    }

    //(3) Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //(4) Save the user to the database
    const newUser = await User.create({
      name: name,
      email,
      password: hashedPassword,
    });

    //(5) Token
    const token = await JWT.sign(
      { email: newUser.email },
      process.env.JWT_SECRET as string,
      {
        expiresIn: 360000,
      }
    );

    res.json({
      errors: [],
      data: {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  }
);

router.post("/login", async (req, res) => {
  //(1) Get the user from the database
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({
      errors: [
        {
          msg: "invalids credentials",
        },
      ],
      data: null,
    });
  }

  //(2) Compare the hashed passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.json({
      errors: [
        {
          msg: "invalids credentials",
        },
      ],
      data: null,
    });
  }

  //(3) Send back a token
  const token = await JWT.sign(
    { email: user.email },
    process.env.JWT_SECRET as string,
    {
      expiresIn: 360000,
    }
  );
  return res.json({
    errors: [],
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
      },
    },
  });
});

router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });

  return res.json({
    errors: [],
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    },
  });
});

module.exports = router;
