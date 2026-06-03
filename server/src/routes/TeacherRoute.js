import express from "express";
import { 
    createTeacher, 
    getTeachers, 
    getTeacherById, 
    deleteTeacher, 
    updateTeacher 
} from "../controller/teacherController.js";

const router = express.Router();

router.post("/register", createTeacher);
router.get("/all", getTeachers);
router.get("/:id", getTeacherById);
router.delete("/:id", deleteTeacher);
router.put("/:id", updateTeacher); 

export default router;
