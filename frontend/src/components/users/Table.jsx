import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "../books/TableFooter";
import axios from "axios";

const Table = ({ users, rowsPerPage, setUserId, seUpdateClicked }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(users, page, rowsPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/users/${id}`
      );
      alert("Usuario eliminado correctamente");
      location.reload();
    } catch (error) {
      alert(error.response.data.msg);
      console.log(error);
    }
  };
  return (
    <>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Libros Prestados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.email}</td>
              <td>
                {el.books.length === 0 ? (
                  "No tiene libros prestados"
                ) : (
                  <>
                    <div className="dropdown">
                      <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id={`dropdownMenuButton${el.id}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Libros
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby={`dropdownMenuButton${el.id}`}
                      >
                        {el.books.map((book) => (
                          <li key={book.id}>
                            <span className="dropdown-item">{book.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(el.id);
                  }}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    seUpdateClicked(true);
                    setUserId(el.id);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <TableFooter range={range} slice={slice} setPage={setPage} page={page} />
    </>
  );
};

export default Table;
