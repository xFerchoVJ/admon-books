import { request, response } from "express";
import { prisma } from "../config/db.js";

const allCategories = async (req = request, res = response) => {
  try {
    const allCategories = await prisma.category.findMany();
    if (allCategories.length === 0) {
      return res.status(200).json({ msg: "No hay categorias." });
    }
    res.status(200).json(allCategories);
  } catch (err) {
    console.log(err);
    const error = new Error("Error al obtener las categorias");
    return res.status(500).json({ msg: error.message });
  }
};

const createCategory = async (req = request, res = response) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        name: req.body.name,
      },
    });
    if (category) {
      return res
        .status(200)
        .json({ msg: `La categoría ${category.name} ya existe` });
    }

    const newCategory = await prisma.category.create({
      data: req.body,
    });

    res
      .status(200)
      .json({ msg: "Categoria creada correctamente", newCategory });
  } catch (err) {
    console.log(err);
    const error = new Error("Error al crear la categoria");
    return res.status(500).json({ msg: error.message });
  }
};

const findCategory = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "No se encontro la categoria" });
    }
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
    const error = new Error("Error al encontrar la categoria");
    return res.status(500).json({ msg: error.message });
  }
};

const updateCategory = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "No se encontro la categoria" });
    }
    const updatedCategory = await prisma.category.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res
      .status(200)
      .json({ msg: "Categoria actualizada correctamente", updatedCategory });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al actualizar la categoria");
    return res.status(500).json({ msg: customError.message });
  }
};

const deleteCategory = async (req = request, res = response) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        categoryBooks: true,
      },
    });

    if (!category) {
      return res.status(404).json({ msg: "No se encontro la categoria" });
    }
    if (category.categoryBooks.length > 0) {
      return res.status(403).json({
        msg: "No puedes eliminar categorias si tienen libros añadidos.",
      });
    }
    const deletedCategory = await prisma.category.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(200)
      .json({ msg: "Categoría eliminada correctamente.", deletedCategory });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al eliminar la categoria");
    return res.status(500).json({ msg: customError.message });
  }
};

export {
  allCategories,
  createCategory,
  findCategory,
  updateCategory,
  deleteCategory,
};
