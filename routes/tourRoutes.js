const express = require("express");
const fs = require("fs");
const {
  checkBody,
  checkId,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

const router = express.Router();

router.param("id", checkId);
router.route("/").get(getAllTours).post(checkBody, createTour);
router
  .route("/:id")
  .get(getTour)
  .patch(checkBody, updateTour)
  .delete(deleteTour);

module.exports = router;
