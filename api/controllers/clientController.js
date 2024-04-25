const services = require("../services/client");
const { hashPassword } = require("../utils/crypto");

const get = async (req, res, next) => {
  try {
    const result = await services.get();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await services.getById(req.params.id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  console.log("dddd");
  try {
    console.log("dddd");

    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const result = await services.create(req.body);
    res.sendStatus(201);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }
    const result = await services.update(req.params.id, req.body);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const deleteId = async (req, res, next) => {
  try {
    const result = await services.deleteById(req.params.id);
    if (!result) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteId,
};
