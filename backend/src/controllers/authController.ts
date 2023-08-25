import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Auth, IAuth } from "../models/authModule";
import { AppError } from "../utilitis/appError";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config({ path: "../../config.env" });

export const auth = (req: any, res: Response, next: NextFunction) => {
  res.status(200).json({
    user: req.user,
  });
};

export const signToken = (id: string) => {
  console.log("id", id);
  return jwt.sign({ id: id }, process.env.JWT_SECRETT as string, {
    expiresIn: "90d",
  });
};

export const createSendToken = (
  user: any,
  statusCode: number,
  res: Response
) => {
  console.log("user", user._id);
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    //קוקי נשלח רק בחיבור מאובטח
    secure: false,
    //דואג שהטוקן לא יוכל להשתנות או שיהיה אליו גישה על ידי הדפדפן
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  // console.log("cookie: ", res.cookie)
  user.password = "";
  user.passwordConfirm = "";

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });

  // res.send("Cookie have been saved successfully");
};

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser = await Auth.create({
    firstName: req.body.user.firstName,
    lastName: req.body.user.lastName,
    age: req.body.user.age,
    email: req.body.user.email,
    password: req.body.user.password,
    passwordConfirm: req.body.user.passwordConfirm,
    role: req.body.user.role,
  });
  createSendToken(newUser, 201, res);

  next();
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      throw new AppError("you miss email or password details", 400);
    // if (!email | !password) return nextconsole.log('you miss email or password details', 400)

    const user = await Auth.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      throw new AppError("there is incorrect password or email", 400);
    }

    createSendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.cookie("jwt", "", {
    expires: new Date(Date.now() - 1),
    //קוקי נשלח רק בחיבור מאובטח
    secure: false,
    //דואג שהטוקן לא יוכל להשתנות או שיהיה אליו גישה על ידי הדפדפן
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const protect = async (req: any, res: Response, next: NextFunction) => {
  // 1) Getting token and check if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) return next();

  // 2) Verification token
  try {
    console.log("1");
    // @ts-ignore
    const decoded: any = await promisify(jwt.verify)(
      token,
      // @ts-ignore
      process.env.JWT_SECRETT as string
    );
    console.log("2");

    // 3) Check if user still exists
    const currentUser = await Auth.findById(decoded.id);
    if (!currentUser) {
      console.log("3");
      return next(new Error("User not found"));
    }

    // 4) Check if user changed password after the token was issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      console.log("4");
      return next();
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    console.log("ere~~~~");

    // Handle verification error
    return next(err);
  }
};

export const restrictTo = (...roles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    console.log("user!!", req.user);
    if (!roles.includes(req.user.role)) {
      return console.log(
        "You do not have permission to perform this action",
        403
      );
    }
    next();
  };
};

export const stayAwake = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("stayAwake run!!");
    res.send("run");
  } catch (error) {
    res.status(400).json({
      status: "fail",
    });
  }
};
