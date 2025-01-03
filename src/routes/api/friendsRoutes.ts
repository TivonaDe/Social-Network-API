import { Router} from 'express';
import { addFriend, deleteFriend, getFriendById, getAllFriends, updateFriend } from '../../controllers/friendController'; // Adjust the import path as necessary
import {getAllUsers} from '../../controllers/userController'; // Adjust the import path as necessary
const router = Router();

//  to add a friend
router.route('/').get(getAllUsers).post(addFriend);
  
  // DELETE to remove a friend
  router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);
 
  // update a friend
  router.route('/:id').get(getFriendById).put(updateFriend).delete(deleteFriend);
  // get all friends
  router.route('/').get(getAllFriends);

  export { router as friendsRouter };