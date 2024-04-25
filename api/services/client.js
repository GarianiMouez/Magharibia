const Client = require("../models/client");

const get = async () => {
  try {
    const result = await Client.findAll({
      attributes: [
        "id",
        "Fname",
        "Lname",
        "BirthDate",
        "username",
        "gender",
        "image",
        "cin",
        "email",
        "tlf",
        "City",
        "cp",
        "adress",
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
    const result = await Client.findByPk(id, {
      attributes: [
        "id",
        "username",
        "Fname",
        "Lname",
        "BirthDate",
        "image",
        "gender",
        "cin",
        "email",
        "tlf",
        "City",
        "cp",
        "adress",
        "createdAt",
        "updatedAt",
      ],
    });
    return result.dataValues;
  } catch (error) {
    throw error;
  }
};
const getByUsername = async (username) => {
  try {
    const result = await Client.findOne({
      where: {
        username,
      },
      attributes: [
        "id",
        "image",
        "Fname",
        "gender",
        "Lname",
        "cp",
        "City",
        "adress",
        "username",
        "password",
        "tlf",
        "cin",
        "email",
        "createdAt",
        "updatedAt",
      ],
    });
    return result;
  } catch (error) {
    throw error;
  }
};
const create = async (data) => {
  console.log("serrr");
  try {
    console.log("serrrrr");
    const result = await Client.create(data);
    return result;
  } catch (error) {
    console.log("service eror");
    console.log(error);
    throw error;
  }
};

const update = async (id, data) => {
  try {
    const result = await Client.update(data, { where: { id } });
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
    const result = await Client.destroy({
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
  getByUsername,
};
