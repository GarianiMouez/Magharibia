const Companies = require("../models/companies");

const get = async () => {
  try {
    const result = await Companies.findAll({
      attributes: [
        "id",
        "rne",
        "Ename",
        "email",
        "City",
        "cp",
        "adress",
        "tlf",
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
    const result = await Companies.findByPk(id, {
      attributes: [
        "id",
        "rne",
        "Ename",
        "email",
        "City",
        "cp",
        "adress",
        "tlf",
        "createdAt",
        "updatedAt",
      ],
    });
    return result.dataValues;
  } catch (error) {
    throw error;
  }
};

const create = async (data) => {
  try {
    const result = await Companies.create(data);
    return result;
  } catch (error) {
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await Companies.update(data, { where: { id } });
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
    const result = await Companies.destroy({
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
