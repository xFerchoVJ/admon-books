import axios from "axios";
import { useEffect, useState } from "react";

const FormUpdate = ({
  setName,
  setAuthor,
  setCategory,
  setDate,
  categories,
  name,
  author,
  category,
  date,
  bookId,
}) => {
  const formatDate = (dateString) => {
    if (!dateString) return ""; // Manejo de caso vacío o nulo

    // Verifica si la cadena de fecha contiene "/" para detectar si está en formato "dd/MM/YYYY"
    const hasSlash = dateString.includes("/");

    // Verifica si la cadena de fecha contiene "-" para detectar si está en formato "YYYY-MM-DD"
    const hasDash = dateString.includes("-");

    let formattedDate = "";

    if (hasSlash) {
      const dateParts = dateString.split("/");
      if (dateParts.length === 3) {
        const [day, month, year] = dateParts;
        formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )}`;
      }
    } else if (hasDash) {
      formattedDate = dateString;
    }

    return formattedDate;
  };
  // Dentro de useEffect
  useEffect(() => {
    const getBook = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/api/books/${bookId}`
        );
        const { name, author, category, publicationDate } = response.data;
        setName(name);
        setAuthor(author);
        setCategory(category.name);
        setDate(formatDate(publicationDate));
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, author, category, date].includes("")) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const letrasEspaciosPuntosComas = /^[A-Za-z\s.,]+$/;
    if (
      !letrasEspaciosPuntosComas.test(name) ||
      !letrasEspaciosPuntosComas.test(author)
    ) {
      alert("El nombre y el autor solo deben contener letras y espacios");
      return;
    }
    const selectedCategory = categories.find((cat) => cat.name === category);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/books/${bookId}`,
        {
          name,
          author,
          categoryId: selectedCategory.id,
          date,
        }
      );
      alert(response.data.msg);
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form className="rounded shadow border p-3 mt-2" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Nombre
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          placeholder="Juan Perez..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Autor
        </label>
        <input
          type="text"
          className="form-control"
          id="author"
          value={author}
          placeholder="J.K..."
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <select
        className="form-select mb-3"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        <option value="">Seleccionar Categoria</option>
        {categories.map((category, index) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="mb-3">
        <label htmlFor="author" className="form-label">
          Fecha de Publicación
        </label>
        <input
          type="date"
          className="form-control"
          id="author"
          value={date}
          placeholder="J.K..."
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Editar" />
    </form>
  );
};

export default FormUpdate;
