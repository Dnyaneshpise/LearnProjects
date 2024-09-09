import express from "express";
import { getTrendingMovie , getMovieTrailers, getMovieDetails ,getSimilarMovies, getMoviesByCategory} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", getTrendingMovie); //give only one trending movie
router.get("/:id/trailers",getMovieTrailers);
router.get("/:id/details",getMovieDetails);
router.get("/:id/similar",getSimilarMovies);
router.get("/:category",getMoviesByCategory); //NOw Playing ,popular,Top Rated,upcoming

export default router;