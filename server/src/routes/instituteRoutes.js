import express from 'express';
import { 
  getInstitutes, 
  createInstitute, 
  updateInstitute, 
  deleteInstitute,
  instituteLogin
} from '../controller/instituteController.js';

const router = express.Router();

router.get('/', getInstitutes);
router.post('/', createInstitute);
router.post('/login', instituteLogin);
router.put('/:id', updateInstitute);
router.delete('/:id', deleteInstitute);

export default router;