import axios from "axios";
import { useState } from "react";

const FormCreate = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, description].includes("")) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const letrasEspaciosPuntosComas = /^[A-Za-z\s.,]+$/;
    if (
      !letrasEspaciosPuntosComas.test(name)
    ) {
      alert("El nombre solo debe contener letras y espacios");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/api/categories",
        {
          name,
          description,
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
          placeholder="Terror..."
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Descripción
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          placeholder="Libros de Terror"
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Crear" />
    </form>
  );
};

export default FormCreate;
