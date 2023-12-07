import axios from "axios";
import { useState } from "react";

const FormCreate = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([name, email].includes("")) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const letrasEspaciosPuntosComas = /^[A-Za-z\s.,]+$/;
    if (!letrasEspaciosPuntosComas.test(name)) {
      alert("El nombre solo deben contener letras y espacios");
      return;
    }
    try {
      const response = await axios.post("http://localhost:3000/api/users", {
        name,
        email,
      });
      alert(response.data.msg);
      location.reload();
    } catch (error) {
      alert(error.response.data.msg);
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
          placeholder="Juan Perez"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          placeholder="test@example.com"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Crear" />
    </form>
  );
};

export default FormCreate;
