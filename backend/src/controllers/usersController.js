import { request, response } from "express";
import { prisma } from "../config/db.js";

const allUsers = async (req = request, res = response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        books: true,
      },
    });
    if (users.length === 0) {
      return res.status(404).json({ msg: "No hay usuarios registrados" });
    }
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    const customError = new Error("Hubo un error al obtener a los usuarios");
    return res.status(500).json({ msg: customError.message });
  }
};

const getUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const borrowedBooks = await prisma.book.findMany({
      where: {
        user: {
          id: user.id,
        },
      },
    });
    res.status(200).json({ user, borrowedBooks });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al obtener usuario");
    return res.status(500).json({ msg: customError.message });
  }
};

const createUser = async (req = request, res = response) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email: req.body.email },
    });
    if (user) {
      return res
        .status(409)
        .json({ msg: `El usuario con el correo: ${req.body.email} ya existe` });
    }
    const createdUser = await prisma.user.create({
      data: req.body,
    });
    res.status(200).json({ msg: "Usuario creado correctamente", createdUser });
  } catch (error) {
    const customError = new Error("Error al crear usuario");
    return res.status(500).json({ msg: customError.message });
  }
};

const updateUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    const updatedUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res
      .status(200)
      .json({ msg: "Usuario actualizado correctamente", updatedUser });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al actualizar usuario");
    return res.status(500).json({ msg: customError.message });
  }
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;
  try {
    const user = await findUserById(id);
    if (!user) {
      return res.status(404).json({ msg: "No existe el usuario" });
    }
    const deletedUser = await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(204)
      .json({ msg: "Usuario eliminado correctamente", deletedUser });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al eliminar usuario");
    return res.status(500).json({ msg: customError.message });
  }
};

const findUserById = async (userId) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(userId),
      },
    });
    return user;
  } catch (error) {
    console.log(error);
  }
};

export { allUsers, getUser, createUser, updateUser, deleteUser };
