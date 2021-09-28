import { useEffect, useState } from "react";
import { useQuery } from "../hooks/useQuery";
import { get } from "../utils/httpClient";
import { MovieCard } from "./MovieCard";
import styles from "./MoviesGrid.module.css";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export function MoviesGrid() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [page, setPage] = useState(1);

  const query = useQuery();
  const search = query.get("search");

  useEffect(() => {
    setisLoading(true);
    const searchUrl = search
      ? `/search/movie?query=${search}&page=${page}`
      : `/discover/movie?page=${page}`;
    get(searchUrl).then((data) => {
      setMovies(data.results);
      setisLoading(false);
    });
  }, [search, page]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <InfiniteScroll
      dataLength={movies.length}
      hasMore={true}
      next={() => setPage((prevPage) => prevPage + 1)}
    >
      <ul className={styles.moviesGrid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </InfiniteScroll>
  );
}
