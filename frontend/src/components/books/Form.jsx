import axios from "axios";
import React from "react";

const Form = ({
  setName,
  setAuthor,
  setCategory,
  setDate,
  categories,
  name,
  author,
  category,
  date,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const soloLetrasConEspacios = /^[A-Za-z\s]+$/;
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
      const response = await axios.post("http://localhost:3000/api/books", {
        name,
        author,
        categoryId: selectedCategory.id,
        publicationDate: date.split("-").reverse().join("/"),
      });
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
          placeholder="J.K..."
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <select
        className="form-select mb-3"
        onChange={(e) => setCategory(e.target.value)}
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
          placeholder="J.K..."
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Crear" />
    </form>
  );
};

export default Form;
