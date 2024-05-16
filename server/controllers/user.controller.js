import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const createUser = async (req, res) => {
  try {
    const user = {
      ...req.body,
      password: bcryptjs.hashSync(req.body.password, 10),
    }
    const newUser = new User(user);
    await newUser.save();
    res.status(201).json(newUser);

  }
  catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Logic for findByIdAndUpdate
export const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id
      , {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(user);
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}

// Logic for findByIdAndDelete
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted");
  }
  catch (error) {
    res.status(404).json({ message: error.message });
  }
}
