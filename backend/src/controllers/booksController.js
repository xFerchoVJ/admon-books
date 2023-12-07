import { prisma } from "../config/db.js";

const getBooks = async (req, res) => {
  try {
    const allBooks = await prisma.book.findMany({
      include: {
        category: true,
        user: true,
      },
      orderBy: {
        name: "asc",
      },
    });
    if (allBooks.length === 0) {
      return res.status(200).json({ msg: "No hay libros." });
    }
    const books = allBooks.map((book) => {
      return {
        id: book.id,
        name: book.name,
        author: book.author,
        publicationDate: book.publicationDate,
        userId: book.userId,
        category: book.category.name,
        user: book.user?.name || "No han pedido prestado el libro",
      };
    });

    res.status(200).json(books);
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
      include: {
        category: true,
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

    res.status(200).json({ msg: "Libro creado con exito", newBook });
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
      data: {
        name: req.body.name,
        author: req.body.author,
        category: {
          connect: { id: req.body.categoryId }, // Aquí establecemos la relación con la categoría
        },
        publicationDate: req.body.date, // Asegúrate de que esta línea refleje correctamente tu estructura de datos
      },
    });

    res.status(200).json({ msg: "Libro editado correctamente", updatedBook });
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
      .json({ msg: "Libro eliminado correctamente.", deletedBook });
  } catch (error) {
    console.log(error);
    const customError = new Error("Error al eliminar el libro");
    return res.status(500).json({ msg: customError.message });
  }
};

const borrowBook = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const book = await prisma.book.findFirst({
      where: {
        id: parseInt(id),
      },
      include: {
        user: true,
      },
    });
    console.log(book.user ? "Tiene user" : "No tiene user");
    if (book.user) {
      return res.status(400).json({ msg: "El lbro ya esta prestado" });
    }
    const borrowBook = await prisma.book.update({
      where: {
        id: parseInt(id),
      },
      data: {
        userId: parseInt(userId),
      },
    });
    res.status(200).json({ msg: "Libro prestado al usuario.", borrowBook });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Error al prestar el libro" });
  }
};

export { getBook, getBooks, createBook, updateBook, deleteBook, borrowBook };
