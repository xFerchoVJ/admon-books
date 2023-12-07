import { useEffect } from "react";

const TableFooter = ({ range, setPage, page, slice }) => {
  useEffect(() => {
    if (slice.length < 1 && page !== 1) {
      setPage(page - 1);
    }
  }, [slice, page, setPage]);
  return (
    <div>
      {range.map((el, index) => (
        <button
          key={index}
          onClick={() => setPage(el)}
          className="btn btn-primary m-2"
        >
          {el}
        </button>
      ))}
    </div>
  );
};

export default TableFooter;
