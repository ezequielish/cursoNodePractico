const express = require("express");

const response = require("../../../network/response");
const Controller = require("./index");
const router = express.Router();
const passport = require("passport");

require("../../../utils/strategies/auth/jwt");

// Routes
router.get("/", passport.authenticate("jwt", { session: false }), list);
router.get("/id", passport.authenticate("jwt", { session: false }), get);
router.get('/following/:id',passport.authenticate("jwt", { session: false }), following);
router.post("/", upsert);
router.put("/", passport.authenticate("jwt", { session: false }), upsert);
router.post("/follow/:id",passport.authenticate("jwt", { session: false }), follow);

// Internal functions
function list(req, res, next) {
  Controller.list(next)
    .then(lista => {
      response.success(req, res, lista, 200);
    })
    .catch(err => {
      next(err)
    });
}

function get(req, res) {
  Controller.get(req.user.sub)
    .then(user => {
      response.success(req, res, user, 200);
    })
    .catch(err => {
      response.error(req, res, err.message, 500);
    });
}

function upsert(req, res, next) {
  Controller.upsert(req.body, req.user ? req.user : false, next)
    .then(user => {
      response.success(req, res, user, 201);
    })
    .catch(err => {
      next(err);
    });
}

function follow(req, res, next) {
   
    Controller.follow(req.user.sub, req.params.id)
        .then(data => {
            response.success(req, res, data, 201);
        })
        .catch(next);
}

function following(req, res, next) {
	return Controller.following(req.params.id)
		.then( (data) => {
			return response.success(req, res, data, 200);
		})
		.catch(next);
}

module.exports = router;
