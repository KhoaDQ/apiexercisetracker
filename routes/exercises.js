const router = require("express").Router();
let Exercise = require("../models/exercise.model");

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       required:
 *         - username
 *         - description
 *         - duration
 *         - date
 *       properties:
 *         _id:
 *           type: string
 *           description: The exercise id
 *         username:
 *           type: string
 *           description: The username of user do exercise
 *         description:
 *           type: string
 *           description: The exercise title of user was done
 *         duration:
 *           type: number
 *           description: The time during user do exercise
 *         date:
 *           type: string
 *           format: date
 *           description: The date that user do exercise
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
 *         description: bike ride
 *         duration: 9
 *         date: 2021-09-07T09:54:36.726Z
 *         createdAt: 2021-09-08T09:54:36.726Z
 *         updatedAt: 2021-09-08T09:54:36.726Z
 *         __v: 0
 */

/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: The exercises managing API
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     summary: Get all exercises log
 *     tags: [Exercises]
 *     responses:
 *       '200':
 *         description: A list of exercises log.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   description:
 *                     type: string
 *                   duration:
 *                     type: number
 *                   date:
 *                     type: string
 *                     format: date
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
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /exercises/add:
 *   post:
 *     summary: Create a new exercise log
 *     tags: [Exercises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - description
 *               - duration
 *               - date
 *             properties:
 *               username:
 *                type: string
 *                description: The username do this exercise
 *               description:
 *                type: string
 *                description: The description of this exercise log or what exercise was done
 *               duration:
 *                type: number
 *                description: The time distance to do this exercise
 *               date:
 *                type: string
 *                format: date
 *                description: The date do this exercise
 *     responses:
 *       '200':
 *         description: The exercise log was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Exercise'
 *       '400':
 *         description: Some error.
 */

router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() => res.json("Exercise added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get a exercise log by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise log id
 *     responses:
 *       '200':
 *         description: A single exercise log.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Exercise'
 *       '400':
 *         description: Have some error.
 */
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /exercises/{id}:
 *   delete:
 *     summary: Delete a exercise log by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise log id
 *     responses:
 *       '200':
 *         description: Exercise log was successfully deleted.
 *       '400':
 *         description: Have some error.
 */
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

/**
 * @swagger
 * /exercises/update/{id}:
 *   put:
 *     summary: Update a exercise log by ID
 *     tags: [Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise log id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - description
 *               - duration
 *               - date
 *             properties:
 *               username:
 *                type: string
 *                description: The username do this exercise
 *               description:
 *                type: string
 *                description: The description of this exercise log or what exercise was done
 *               duration:
 *                type: number
 *                description: The time distance to do this exercise
 *               date:
 *                type: string
 *                format: date
 *                description: The date do this exercise
 *     responses:
 *       '200':
 *         description: Exercise log was successfully updated.
 *       '400':
 *         description: Have some error.
 */
router.route("/update/:id").put((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
