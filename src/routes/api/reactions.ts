import { Router, type Router as ExpressRouter } from 'express';
import { createReaction, removeReaction } from '../../controllers/reactionController';
const router: ExpressRouter = Router();

// to create a reaction
router.route('/:thoughtId/reactions/:reactionId').post(createReaction);
  
  // DELETE to remove a reaction
  router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);
  
  export { router as reactionsRouter };