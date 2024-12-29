import { Router, type Router as ExpressRouter } from 'express';
import type { Request, Response } from 'express';
import { Reaction } from '../../models/reactionSchemaModel';
import { Thought } from '../../models/thoughtModel';
const router: ExpressRouter = Router();

// POST to create a reaction
router.post('/:thoughtId/reactions', async (req: Request<{ thoughtId: string }, any, any, any>, res: Response): Promise<Response | void> => {
    try {
      const reaction = new Reaction(req.body);
      await reaction.save();
      const thought = await Thought.findById(req.params.thoughtId);
      if (thought) {
        thought.reactions.push(reaction._id);
      } else {
        return res.status(404).json({ message: 'Thought not found' });
      }
      await thought.save();
      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  // DELETE to remove a reaction
  router.delete('/:thoughtId/reactions/:reactionId', async (req: Request<{ thoughtId: string; reactionId: string }, {}, {}, {}>, res: Response): Promise<Response | void> => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (thought) {
        thought.reactions = thought.reactions.filter(reactionId => reactionId.toString() !== req.params.reactionId);
      } else {
        return res.status(404).json({ message: 'Thought not found' });
      }
      await thought.save();
      res.json({ message: 'Reaction removed' });
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
  export {};