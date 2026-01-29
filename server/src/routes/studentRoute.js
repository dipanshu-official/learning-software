import express from "express";
import { createStudent, getStudents, getStudentById, deleteStudent, updateStudent } from "../controller/studentController.js";

const router = express.Router();

router.post("/create", createStudent);
router.get("/allstudents", getStudents);
router.get("/getstudent/:id", getStudentById);
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent);

export default router;