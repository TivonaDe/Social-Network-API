const User = require('../models/User');
const Thought = require('../models/Thought');


// GET all users
interface Request {
  params: {
    userId: string;
    friendId?: string;
  };
  body: any;
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving users', error: err });
  }
};

// GET a single user by _id and populate thoughts and friends
interface GetUserByIdRequest extends Request {
  params: {
    userId: string;
  };
}

interface GetUserByIdResponse extends Response {}

export const getUserById = async (req: GetUserByIdRequest, res: GetUserByIdResponse): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving user', error: err });
  }
};

// POST a new user
interface CreateUserRequest extends Request {
  body: {
    username: string;
    email: string;
    // Add other user fields here
  };
}

interface CreateUserResponse extends Response {}

export const createUser = async (req: CreateUserRequest, res: CreateUserResponse): Promise<void> => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error creating user', error: err });
  }
};

// PUT to update a user by _id
interface UpdateUserRequest extends Request {
  params: {
    userId: string;
  };
  body: {
    username?: string;
    email?: string;
    // Add other user fields here
  };
}

interface UpdateUserResponse extends Response {}

export const updateUser = async (req: UpdateUserRequest, res: UpdateUserResponse): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user', error: err });
  }
};

// DELETE a user by _id and associated thoughts
export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    await Thought.deleteMany({ userId: req.params.userId }); // Remove associated thoughts
    res.json({ message: 'User and thoughts deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
};

// POST to add a friend
const addFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);
    if (!user || !friend) {
      return res.status(404).json({ message: 'User or Friend not found' });
    }
    user.friends.push(friend._id);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error adding friend', error: err });
  }
};

// DELETE to remove a friend
const removeFriend = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.params.userId);
    user.friends.pull(req.params.friendId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error removing friend', error: err });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};

export {};