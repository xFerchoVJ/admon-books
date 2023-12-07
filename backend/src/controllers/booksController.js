import { prisma } from "../config/db.js";

const getBooks = async (req, res) => {
  try {
    const allBoks = await prisma.book.findMany();
    if (allBoks.length === 0) {
      return res.status(200).json({ msg: "No hay libros." });
    }
    res.status(200).json(allBoks);
  } catch (err) {
    console.log(err);
    const error = new Error("Error al obtener los libros");
    return res.status(500).json({ msg: error.message });
  }
};

const getBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!book) {
      return res.status(404).json({ msg: "No se encontro el libro" });
    }
    res.status(200).json(book);
  } catch (err) {
    console.log(err);
    const error = new Error("Error al encontrar el libro");
    return res.status(500).json({ msg: error.message });
  }
};

const createBook = async (req, res) => {
  const { categoryId } = req.body;
  try {
    const book = await prisma.book.findFirst({
      where: {
        name: req.body.name,
      },
    });
    if (book) {
      return res.status(200).json({ msg: `El libro ${book.name} ya existe` });
    }
    const category = await prisma.category.findFirst({
      where: {
        id: parseInt(categoryId),
      },
    });

    if (!category) {
      return res
        .status(401)
        .json({ msg: "No puedes actualizar libros sin una categoria" });
    }
    const newBook = await prisma.book.create({
      data: req.body,
    });

    res.status(200).json(newBook);
  } catch (err) {
    console.log(err);
    const error = new Error("Error al crear el libro");
    return res.status(500).json({ msg: error.message });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!book) {
      return res.status(404).json({ msg: "No se encontro el libro" });
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: parseInt(id),
      },
      data: req.body,
    });
    res.status(200).json(updatedBook);
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al actualizar el libro");
    return res.status(500).json({ msg: customError.message });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "El id es obligatorio" });
  }
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    if (!book) {
      return res.status(404).json({ msg: "No se encontro el libro" });
    }

    const deletedBook = await prisma.book.delete({
      where: {
        id: parseInt(id),
      },
    });
    res
      .status(200)
      .json({ msg: "Categoría eliminada correctamente.", deletedBook });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al eliminar el libro");
    return res.status(500).json({ msg: customError.message });
  }
};

export { getBook, getBooks, createBook, updateBook, deleteBook };
