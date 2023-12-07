import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/users/Table";
import FormCreate from "../components/users/FormCreate";
import FormUpdate from "../components/users/FormUpdate";
const Users = () => {
  const [users, setUsers] = useState([]);
  const [updateClicked, seUpdateClicked] = useState(false);
  const [userId, setUserId] = useState(null);
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState("");
  const [selectedUser, setselectedUser] = useState("");
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios("http://localhost:3000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    const getBooks = async () => {
      try {
        const response = await axios("http://localhost:3000/api/books");
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
    getBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([book, selectedUser].includes("")) {
      alert("Todos los campos son obligatorios");
      return;
    }
    const selectedBook = books.find((bo) => bo.name == book);
    const userSelect = users.find((user) => user.name == selectedUser);
    try {
      const response = await axios.post(
        `http://localhost:3000/api/books/borrow-books/${selectedBook.id}`,
        {
          userId: userSelect.id,
        }
      );
      console.log(response.data);
      alert(response.data.msg);
      location.reload();
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center">Usuarios Registrados en el Sistema</h1>
      <button
        className="btn btn-primary text-end"
        onClick={(e) => {
          e.preventDefault();
          seUpdateClicked(false);
        }}
      >
        Crear Usuario
      </button>
      {users.length > 0 ? (
        <Table
          users={users}
          rowsPerPage={5}
          seUpdateClicked={seUpdateClicked}
          setUserId={setUserId}
        />
      ) : (
        <h1 className="text-center">No hay usuarios registrados</h1>
      )}

      <div className="my-3 w-50">
        {updateClicked ? (
          <>
            <h2>Editar Usuario</h2>
            <FormUpdate userId={userId} />
          </>
        ) : (
          <>
            <h2>Crear Usuario</h2>
            <FormCreate />
          </>
        )}
        <h2 className="mt-5 mb-3">Prestar Libro</h2>
        <form
          className="rounded shadow border p-3 mt-2"
          onSubmit={handleSubmit}
        >
          <div className="mb-2">
            <select
              className="form-select"
              onChange={(e) => setBook(e.target.value)}
            >
              <option value="">Seleccionar Libro</option>
              {books.map((book) => (
                <option key={book.id}>{book.name}</option>
              ))}
            </select>
            <select
              className="form-select mt-2"
              onChange={(e) => setselectedUser(e.target.value)}
            >
              <option value="">Seleccionar Usuario</option>
              {users.map((user) => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
          </div>
          <input
            type="submit"
            value="Prestar Libro"
            className="btn btn-primary"
          />
        </form>
      </div>
    </div>
  );
};

export default Users;
