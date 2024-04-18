const Ship = require("../models/ship");
const clientService = require("./client");
const campanyService = require("./companies");

const get = async () => {
  try {
    const result = await Ship.findAll({
      attributes: [
        "id",
        "description",
        "ownerType",

        "name",
        "mark",
        "ownerId",
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
        "ownerType",
        "ownerId",
        "createdAt",
        "updatedAt",
      ],
    });
    if (!result) {
      return null;
    }
    if (result.ownerType === "person") {
      const client = await clientService.getById(result.ownerId);
      result.dataValues.client = client;
    } else {
      const campany = await campanyService.getById(result.ownerId);
      result.dataValues.campany = campany;
    }
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
