import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  //Check if they have token. If not, return
  let token = req.header("authorization");
  if (!token) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }

  //Pick only token without 'Bearer'
  token = token.split(" ")[1];

  try {
    const user = (await JWT.verify(
      token,
      process.env.JWT_SECRET as string
    )) as { email: string };
    req.user = user.email;
    next();
  } catch (error) {
    return res.status(403).json({
      errors: [
        {
          msg: "unauthorized",
        },
      ],
    });
  }
};

export default checkAuth;
