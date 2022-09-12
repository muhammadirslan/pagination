import React from "react";
import "./table.css";
// import { useMovieContext } from "./MovieContext";
import movieData from "./movieData.json";
import ReactPaginate from "react-paginate";

export default function Table() {
  // const [movies] = useMovieContext();
  const [data, setData] = React.useState(movieData);
  const [order, setOrder] = React.useState("ASC");
  const [pageNumber, setPageNumber] = React.useState(0);

  //   console.log(movies);

  const moviesPerPage = 3;

  const pagesVisited = pageNumber * moviesPerPage;
  const displaymovies = data
    .slice(pagesVisited, pagesVisited + moviesPerPage)
    .map((value) => {
      return (
        <table className="body-table">
          <tbody>
            <tr>
              <td>{value.Title}</td>
              <td>{value.Genre.name}</td>
              <td>{value.Stock}</td>
              <td>{value.Rate}</td>
            </tr>
          </tbody>
        </table>
      );
    });
  const pageCount = Math.ceil(data.length / moviesPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const sorting = (col) => {
    if (order === "ASC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowercase() > b[col].toLowercase() ? 1 : -1
      );
      setData(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...data].sort((a, b) =>
        a[col].toLowercase() < b[col].toLowercase() ? 1 : -1
      );
      setData(sorted);
      setOrder("ASC");
    }
  };

  return (
    <div className="movie-table">
      <p> Showing {data.length} movies in the Database</p>
      <div className="Table-head">
        <table className="head-table">
          <thead>
            <th onClick={() => sorting("Title")}>Title</th>
            <th onClick={() => sorting("Genre")}>Genre</th>
            <th onClick={() => sorting("Stock")}>Stock</th>
            <th onClick={() => sorting("Rate")}>Rate</th>
          </thead>
        </table>
        {/* {data.map((value) => {
          return (
            <table className="body-table">
              <tbody>
                <tr>
                  <td>{value.Title}</td>
                  <td>{value.Genre.name}</td>
                  <td>{value.Stock}</td>
                  <td>{value.Rate}</td>
                </tr>
              </tbody>
            </table>
          );
        })} */}
        {displaymovies}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBtn"}
          previousLinkClassName={"prevBtn"}
          nextLinkClassName={"nextBtn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}
