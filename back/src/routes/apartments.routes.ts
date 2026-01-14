import { Router } from 'express';

import { requireAdmin } from '../middleware/auth.middleware';
import { ApartmentsController } from '../controllers/apartments.controller';

const ac = new ApartmentsController();

const router = Router();

router.get('/cities', ac.handleGetCities.bind(ac));
router.get('/types', ac.handleGetTypes.bind(ac));
router.get('/', ac.handleGetApartments.bind(ac));
router.get('/premium',ac.handleGetPremiumProperties.bind(ac));
router.post('/chat', ac.handleGetApartmentsByAI.bind(ac));
router.post('/agent', ac.talkWithAgent.bind(ac));
router.get('/:id', ac.handleGetApartmentById.bind(ac));

router.post('/', requireAdmin, ac.handleCreateApartment.bind(ac));
router.put('/:id', requireAdmin, ac.handleUpdateApartment.bind(ac));
router.delete('/:id', requireAdmin, ac.handleDeleteApartment.bind(ac));

export default router;
