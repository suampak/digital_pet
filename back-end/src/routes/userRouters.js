import express from "express";
import User from "./../models/userModel";

const userRouter = (userModel => {
  const router = express.Router();
  router.use("/users", (req, res, next) => {
    const query = {};
    if (req.query.name) {
      query.name = req.query.name;
    }
    userModel.find(query, (err, users) => {
      if (err) {
        return res.send(err);
      }
      if (users) {
        req.users = users;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  router
    .route("/users")
    .get((req, res) => {
      res.json(req.users);
    })
    .delete((req, res) => {
      for (let user of req.users) {
        user.remove(err => {
          if (err) {
            return res.send(err);
          }
        });
      }
      return res.sendStatus(204);
    })
    .post((req, res) => {
      const user = new userModel(req.body);
      user.save();
      return res.json(user);
    });
  router.use("/users/:userId", (req, res, next) => {
    userModel.findById(req.params.userId, (err, user) => {
      if (err) {
        return res.send(err);
      }
      if (user) {
        req.user = user;
        return next();
      }
      return res.sendStatus(404);
    });
  });
  router
    .route("/users/:userId")
    .get((req, res) => res.json(req.user))
    .put((req, res) => {
      const { user } = req;
      const { body } = req;
      user.name = body.name;
      user.password = body.password;
      user.gender = body.gender;
      user.exp = body.exp;
      user.point = body.point;
      user.pets = body.pets;
      user.timestamp = body.timestamp;
      req.user.save(err => {
        if (err) {
          return res.send(err);
        }
        return res.json(user);
      });
    })
    .delete((req, res) => {
      req.user.remove(err => {
        if (err) {
          return res.send(err);
        }
        return res.sendStatus(204);
      });
    });

  return router;
})(User);

export default userRouter;
