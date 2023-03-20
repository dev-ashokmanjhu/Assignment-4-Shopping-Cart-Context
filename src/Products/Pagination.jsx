import React from "react";
import classes from "./Pagination.module.css";
const Pagination = ({
  productsPerPage,
  totalProducts,
  paginate,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul
        className={classes.pagination}
        style={{ display: "flex", padding: "10px" }}
      >
        <button onClick={() => paginate(currentPage - 1)}>PREV</button>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${currentPage === number ? classes.active : ""}`}
            >
              {number}
            </button>
          </li>
        ))}
        <button onClick={() => paginate(currentPage + 1)}>NEXT</button>
      </ul>
    </nav>
  );
};

export default Pagination;
