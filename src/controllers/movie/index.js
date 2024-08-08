import Logger from "../../utils/logger.js";
import * as Constants from "../../constants/index.js";
import * as Service from "../../services/movie/index.js";
import Debug from "debug";

const debug = Debug("deseo:movie:controller");

const createMovie = async (request, response) => {
  const appResponse = { ...Constants.defaultServerResponse };
  try {
    const { name, img, summary } = request.body;
    await Service.createMovie(name, img, summary);
    appResponse.status = Constants.HTTP.SUCCESS.code;
    appResponse.message = `${Constants.movie.messages.MOVIE_CREATED}`;
  } catch (error) {
    appResponse.status = Constants.HTTP.BAD_REQUEST.code;
    appResponse.message = error.message;
    debug(appResponse.message);
    Logger.error(
      `file: @controller/movie, func:createMovie(), message:${appResponse.message}`
    );
  }
  response.status(appResponse.status).json(appResponse);
};

const getMovie = async (request, response) => {
  const appResponse = { ...Constants.defaultServerResponse };
  try {
    const { id } = request.params;
    const movie = await Service.getMovie(id);
    if (movie) {
      appResponse.status = Constants.HTTP.SUCCESS.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_FETCHED}`;
      appResponse.body = movie;
    } else {
      appResponse.status = Constants.HTTP.NOT_FOUND.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_NOT_FOUND}`;
    }
  } catch (error) {
    appResponse.status = Constants.HTTP.BAD_REQUEST.code;
    appResponse.message = error.message;

    Logger.error(
      `file: @controller/movie, func:getMovie(), message:${appResponse.message}`
    );
  }
  response.status(appResponse.status).json(appResponse);
};

const listMovies = async (request, response) => {
  const appResponse = { ...Constants.defaultServerResponse };
  try {
    const { take, bookmark, search } = request.query;

    const takeValue = take ? Number(take) : 10;
    const responseArray = [];
    const returnValues = await Service.listMovies(takeValue, bookmark, search);
    const movie = returnValues[0];
    movie.forEach(async (element) => {
      responseArray.push(element);
    });
    appResponse.status = Constants.HTTP.NOT_FOUND.code;
    appResponse.message = Constants.movie.messages.MOVIE_LIST_NOT_FOUND;
    if (movie.length > 0) {
      appResponse.status = Constants.HTTP.SUCCESS.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_LIST_FETCHED}`;
      appResponse.body = {
        records: responseArray,
        count: returnValues[0].length,
        bookmark: returnValues[1],
      };
    }
  } catch (error) {
    appResponse.status = Constants.HTTP.BAD_REQUEST.code;
    appResponse.message = error.message;

    Logger.error(
      `file: @controller/movie, func:listMovies(), message:${appResponse.message}`
    );
  }
  response.status(appResponse.status).json(appResponse);
};

const updateMovie = async (request, response) => {
  const appResponse = { ...Constants.defaultServerResponse };
  try {
    const { name, img, summary } = request.body;
    const { id } = request.params;
    const movie = await Service.updateMovie(name, img, summary, id);
    if (movie) {
      appResponse.status = Constants.HTTP.SUCCESS.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_UPDATED}`;
    } else {
      appResponse.status = Constants.HTTP.NOT_FOUND.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_NOT_FOUND}`;
    }
  } catch (error) {
    appResponse.status = Constants.HTTP.BAD_REQUEST.code;
    appResponse.message = error.message;

    Logger.error(
      `file: @controller/movie, func:updateMovie(), message:${appResponse.message}`
    );
  }
  response.status(appResponse.status).json(appResponse);
};

const deleteMovie = async (request, response) => {
  const appResponse = { ...Constants.defaultServerResponse };
  try {
    const { id } = request.params;
    const movie = await Service.deleteMovie(id);
    if (movie) {
      appResponse.status = Constants.HTTP.SUCCESS.code;
      appResponse.message = Constants.movie.messages.MOVIE_DELETED;
    } else {
      appResponse.status = Constants.HTTP.NOT_FOUND.code;
      appResponse.message = `${Constants.movie.messages.MOVIE_NOT_FOUND}`;
    }
  } catch (error) {
    appResponse.status = Constants.HTTP.BAD_REQUEST.code;
    appResponse.message = error.message;

    Logger.error(
      `file: @controller/movie, func:deleteMovie(), message:${appResponse.message}`
    );
  }
  response.status(appResponse.status).json(appResponse);
};
export { createMovie, getMovie, listMovies, updateMovie, deleteMovie };
