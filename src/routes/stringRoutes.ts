import { Router } from 'express';
import { StringController } from '../controllers/stringController';
import { validateCreateString, validateQueryParams } from '../middleware/validation';
import { asyncHandler } from '../utils/asyncHandler';

const router = Router();

router.post('/strings', validateCreateString, asyncHandler(StringController.createString));
router.get('/strings/filter-by-natural-language', asyncHandler(StringController.filterByNaturalLanguage));
router.get('/strings/:string_value', asyncHandler(StringController.getString));
router.get('/strings', validateQueryParams, asyncHandler(StringController.getAllStrings));
router.delete('/strings/:string_value', asyncHandler(StringController.deleteString));

export default router;
