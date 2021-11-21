const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.duration || !req.body.price) {
    return res
      .status(400)
      .json({ status: "fail", message: "Body not defined properly" });
  }
  next();
};

exports.checkId = (req, res, next, val) => {
  if (val * 1 > tours.length) {
    return res.status(404).json({ status: "failed", message: "Invalid Id" });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: { tours },
  });
};

exports.getTour = (req, res) => {
  const { id } = req.params;
  const tour = tours.find((tour) => tour.id === id * 1);
  res
    .status(200)
    .json({ status: "success", requestedAt: req.requestTime, data: { tour } });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  const { id } = req.params;

  const updatedTour = Object.assign({ id: id * 1 }, req.body);
  tours.splice(id, 1, updatedTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(200).json({ status: "success", data: { tour: updatedTour } });
    }
  );
};

exports.deleteTour = (req, res) => {
  tours.splice(id, 1);

  res.status(204).json({ status: "success", data: null });
};
