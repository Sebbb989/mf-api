import { NextFunction, Response, Request } from "express";
import Institute from "../models/Institute.js";
import { IGrade } from "../types/types.js";
import User from "../models/User.js";

export const getAllInstitutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //aqui tenemos todos los institutos
  try {
    const institutes = await Institute.find();

    //response
    return res.status(200).json({ message: "OK", institutes });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};

export const enrollClassroom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    instituteId,
    grade,
    userId,
  }: { instituteId: string; grade: number; userId: string } = req.body;

  try {
    const institute = await Institute.findOne({ _id: instituteId });
    if (!institute) return res.status(404).send("Institute not found");
    if (institute.grades.length == 0) return res.status(404).send("Institute has no grades");

    const user = await User.findOne({ _id: userId });
    if (!user) return res.status(404).send("User not found");
    if (user.isEnrolled) return res.status(400).send("User already enrolled in a grade");

    const modifiedGrade = await institute.grades.find(
      (iteratingGrade: IGrade) => iteratingGrade.grade == grade
    );
    if (!modifiedGrade) return res.status(404).send("Grade not found");

    modifiedGrade.students.find((iteratingStudent) => iteratingStudent == user)
      ? res.status(400).send("Student already enrolled")
      : console.log(modifiedGrade.students.length, modifiedGrade.capacity)
      if (modifiedGrade.students.length >= modifiedGrade.capacity)
      return res.status(400).send("Grade is full");
      if (modifiedGrade.currentlyEnrolled == modifiedGrade.capacity)
      return res.status(400).send("Grade is full");
    

    user.isEnrolled = true;

    const generateRandomString = () => {
      const length = 12;
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
    
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
    
      return result;
    }

    user.enrollNumber = generateRandomString();
    

    modifiedGrade.students.push(user);
    modifiedGrade.currentlyEnrolled = modifiedGrade.currentlyEnrolled + 1;


    console.log('institute: ',institute)
    console.log('user: ',user)

    await user.save();
    await institute.save();

    //response
    return res.status(200).json({ message: "OK", institute });
  } catch (error) {
    console.log(error);

    //response
    return res.status(400).json({ message: "Error", cause: error.message });
  }
};
