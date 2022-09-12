import React from "react";
import moviesData from "./movieData.json";

const createMovieStateContext = React.createContext(undefined);
const createMovieDispatchCotext = React.createContext(undefined);

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = React.useState(moviesData);

  const handleMovieData = (movies) => {
    setMovies(movies);
  };
  return (
    <createMovieStateContext.Provider value={movies}>
      <createMovieDispatchCotext.Provider value={{ handleMovieData }}>
        {children}
      </createMovieDispatchCotext.Provider>
    </createMovieStateContext.Provider>
  );
};

const useCreateMovieStateContext = () => {
  const context = React.useContext(createMovieStateContext);

  if (context === undefined) {
    throw Error("use state Context is not defined");
  }
  return context;
};

const useCreateMovieDispatchContext = () => {
  const context = React.useContext(createMovieDispatchCotext);

  if (context === undefined) {
    throw Error("use state Context is not defined");
  }
  return context;
};

const useMovieContext = () => {
  return [useCreateMovieStateContext(), useCreateMovieDispatchContext()];
};

export { MovieContextProvider, useMovieContext };
