import Product from "./Product/Product";
import classes from "./Products.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import Loader from "../UI/Loader";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoding, setIsLoding] = useState(true);
  // states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);
  // calling a external api for getting data with axios
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        setProducts(response.data.products);
        setIsLoding(false);
      })
      .catch((err) => console.log(err));
  }, []);

  // Get products page index of first and last product
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const lastPage = products.length / productsPerPage;

  const paginate = (pageNumber) => {
    if (pageNumber < 1) {
      return setCurrentPage(3);
    }
    if (pageNumber > lastPage) {
      return setCurrentPage(1);
    }
    setCurrentPage(pageNumber);
  };
  // map over filterd products for pagination
  const productList = currentProduct.map((product) => (
    <Product
      key={product.id}
      id={product.id}
      name={product.title}
      description={product.description}
      price={product.price}
      img={product.thumbnail}
    />
  ));
  if (isLoding) {
    return <Loader />;
  }
  return (
    <section className={classes.products}>
      <ul>{productList}</ul>
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={products.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </section>
  );
};

export default Products;
