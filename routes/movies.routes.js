// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Movie = require("./../models/Movie.model");

// all your routes here

router.get("/movies", async (req, res, next) => {
  try {
    const allMovies = await Movie.find();
    //console.log(allMovies);
    res.render("movies/movies", { allMovies });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/create", (req, res, next) => {
  res.render("movies/new-movie");
});

router.post("/movies/create", async (req, res, next) => {
  const { title, genre, plot, cast } = req.body;
  try {
    await Movie.create({ title, genre, plot, cast });

    res.redirect("/movies");
  } catch (error) {
    res.render("movies/new-movie");
  }
});

router.get("/movies/:id", async (req, res, next) => {
  try {
    const myMovie = await Movie.findById(req.params.id).populate("cast");
    res.render("movies/movie-details", { myMovie });
  } catch (error) {
    next(error);
  }
});

router.get("/movies/:id/edit", async (req, res, next) => {
  try {
    const myMovie = await Movie.findById(req.params.id);

    res.render("movies/edit-movie", { myMovie });
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id/edit", async (req, res, next) => {
  try {
    const editMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    //console.log(editMovie);
    res.redirect(`/movies/${editMovie._id}`);
  } catch (error) {
    next(error);
  }
});

router.post("/movies/:id/delete", async (req, res, next) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
