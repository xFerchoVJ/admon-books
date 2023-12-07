import { useState } from "react";
import useTable from "../../hooks/useTable";
import TableFooter from "../books/TableFooter";
import axios from "axios";

const Table = ({ categories, rowsPerPage, setCategoryId, seUpdateClicked }) => {
  const [page, setPage] = useState(1);
  const { slice, range } = useTable(categories, page, rowsPerPage);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/categories/${id}`
      );
      alert(response.data.msg);
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {slice.map((el) => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.name}</td>
              <td>{el.description}</td>
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
                    setCategoryId(el.id);
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
