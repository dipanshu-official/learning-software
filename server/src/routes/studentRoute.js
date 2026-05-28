import express from "express";
import { createStudent, getStudents, getStudentById, deleteStudent, updateStudent } from "../controller/studentController.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("passportPhoto"), createStudent);
router.get("/allstudents", getStudents);
router.get("/getstudent/:id", getStudentById);
router.delete("/delete/:id", deleteStudent);
router.put("/update/:id", updateStudent); 

export default router;
