import axios from "axios";
import { useState, useEffect } from "react";
import Table from "../components/books/Table";
import Form from "../components/books/Form";
import FormUpdate from "../components/books/FormUpdate";
import { Link } from "react-router-dom";
const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [updateClicked, seUpdateClicked] = useState(false);
  const [bookId, setBookId] = useState(0);

  useEffect(() => {
    getBooks();
    getCategories();
  }, []);
  const getBooks = async () => {
    try {
      const response = await axios("http://localhost:3000/api/books");
      setBooks(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await axios("http://localhost:3000/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="container mt-4">
      <h1 className="text-center">Libros Registrados en el Sistema</h1>
      {books.length > 0 ? (
        <>
          <button
            className="btn btn-primary text-end"
            onClick={(e) => {
              e.preventDefault();
              seUpdateClicked(false);
            }}
          >
            Crear Libro
          </button>
          <Table
            books={books}
            rowsPerPage={5}
            seUpdateClicked={seUpdateClicked}
            setBookId={setBookId}
          />
        </>
      ) : (
        <>
          <h2 className="text-center">No hay libros registrados</h2>
          <Link to="/categories">
            <h3 className="text-center mt-3 text-decoration-underline">
              Crea una categoria para poder crear un libro.
            </h3>
          </Link>
        </>
      )}
      {categories.length > 0 && (
        <div className="my-3 w-50">
          {updateClicked ? (
            <>
              <h2>Editar Libro</h2>
              <FormUpdate
                setName={setName}
                setAuthor={setAuthor}
                setCategory={setCategory}
                setDate={setDate}
                categories={categories}
                name={name}
                author={author}
                category={category}
                date={date}
                bookId={bookId}
              />
            </>
          ) : (
            <>
              <h2>Crear libro</h2>
              <Form
                setName={setName}
                setAuthor={setAuthor}
                setCategory={setCategory}
                setDate={setDate}
                categories={categories}
                name={name}
                author={author}
                category={category}
                date={date}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
