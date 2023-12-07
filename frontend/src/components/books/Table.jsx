import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "./TableFooter";
import axios from "axios";

const Table = ({ books, rowsPerPage, setBookId, seUpdateClicked }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(books, page, rowsPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/books/${id}`
      );
      alert(response.data.msg);
      location.reload();
    } catch (error) {
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
            <th>Autor</th>
            <th>Fecha Publicación</th>
            <th>Categoría</th>
            <th>Usuario con el Libro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.author}</td>
              <td>{el.publicationDate}</td>
              <td>{el.category}</td>
              <td>{el.user}</td>
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
                    setBookId(el.id);
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
