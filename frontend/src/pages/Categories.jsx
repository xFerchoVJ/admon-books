import { useEffect, useState } from "react";
import Table from "../components/categories/Table";
import axios from "axios";
import FormCreate from "../components/categories/FormCreate";
import FormUpdate from "../components/categories/FormUpdate";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [updateClicked, seUpdateClicked] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios("http://localhost:3000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getCategories();
  }, []);
  return (
    <div className="container mt-4">
      <h1 className="text-center">Categorias Registradas en el Sistema</h1>
      <button
        className="btn btn-primary text-end"
        onClick={(e) => {
          e.preventDefault();
          seUpdateClicked(false);
        }}
      >
        Crear Categoria
      </button>
      {categories.length > 0 ? (
        <Table
          categories={categories}
          rowsPerPage={5}
          seUpdateClicked={seUpdateClicked}
          setCategoryId={setCategoryId}
        />
      ) : (
        <h1 className="text-center">No hay categorias registradas</h1>
      )}

      <div className="my-3 w-50">
        {updateClicked ? (
          <>
            <h2>Editar Categoria</h2>
            <FormUpdate categoryId={categoryId} />
          </>
        ) : (
          <>
            <h2>Crear Categoria</h2>
            <FormCreate />
          </>
        )}
      </div>
    </div>
  );
};
