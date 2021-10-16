const router = require("express").Router();
let User = require("../models/user.model");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *       properties:
 *         _id:
 *           type: string
 *           description: The user id
 *         username:
 *           type: string
 *           description: The username of user
 *         createdAt:
 *           type: string
 *           format: date
 *           description: Timestamps
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: Timestamps
 *         __v:
 *           type: integer
 *           description: Timestamps
 *       example:
 *         _id: 6138885c19702d319794182f
 *         username: Nguyen Van A
 *         createdAt: 2021-09-08T09:54:36.726Z
 *         updatedAt: 2021-09-08T09:54:36.726Z
 *         __v: 0
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date
 *                   updatedAt:
 *                     type: string
 *                     format: date
 *                   __v:
 *                     type: integer
 */

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /users/add:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *             properties:
 *               username:
 *                type: string
 *                description: The username
 *     responses:
 *       '200':
 *         description: The user was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/User'
 *       '400':
 *         description: Some error
 */

router.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
