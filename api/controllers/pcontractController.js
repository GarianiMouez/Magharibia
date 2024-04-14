const services = require("../services/Pcontract");
const clientService = require("../services/client");
const shipService = require("../services/ship");

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
    if (result.ClientId != null && result.ShipId != null) {
      const client = await clientService.getById(result.ClientId);
      const ship = await shipService.getById(result.ShipId);

      result.client = client;
      result.ship = ship;

      res.json(result);
    } else {
      return res.json(result);
    }
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
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
