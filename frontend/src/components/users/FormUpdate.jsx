import axios from "axios";
import { useState, useEffect } from "react";

const FormUpdate = ({ userId }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios(
          `http://localhost:3000/api/users/${userId}`
        );
        const { name, email } = response.data.user;
        setName(name);
        setEmail(email);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [userId]);

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
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}`,
        {
          name,
          email,
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
          placeholder="Juan Perez"
          value={name}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <input type="submit" className="btn btn-primary" value="Crear" />
    </form>
  );
};

export default FormUpdate;
