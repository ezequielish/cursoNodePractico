const express = require("express");
const passport =  require("passport")
const response = require("../../../network/response");
const Controller = require("./index");

const router = express.Router();

router.post("/login", function(req, res, next) {
  passport.authenticate("basic", function(err, user) {
    if (err) {
      next(err);
      return;
    }
    req.login(user, { session: false }, async function(err) {
      if (err) {
        next(err);
        return;
      }
      Controller.logIn(user, req, next)
        .then(token => {
          response.success(req, res, token, 200);
        })
        .catch(e => {
          next(e)
        });
    });
  })(req, res, next);
});

module.exports = router;
