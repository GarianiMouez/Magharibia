const Ship = require("../models/ship");
const clientService = require("./client");

const get = async () => {
  try {
    const result = await Ship.findAll({
      attributes: [
        "id",
        "description",
        "name",
        "mark",
        "ClientId",
        "createdAt",
        "updatedAt",
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};

const getById = async (id) => {
  try {
    const result = await Ship.findByPk(id, {
      attributes: [
        "id",
        "description",
        "name",
        "mark",
        "ClientId",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!result) {
      return null;
    }
    const client = await clientService.getById(result.ClientId);
    result.dataValues.client = client;
    console.log(result);

    return result;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const result = await Ship.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await Ship.update(data, { where: { id } });
    if (!result || result[0] != 1) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const result = await Ship.destroy({
      where: {
        id,
      },
    });
    if (result === 0) {
      return false;
    }
    return true;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  deleteById,
};
