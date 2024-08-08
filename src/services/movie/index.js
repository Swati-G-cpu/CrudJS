import Debug from "debug";
import * as Constants from "../../constants/index.js";
// import prisma from "../../utils/DBConnect.js";
import Logger from "../../utils/logger.js";
import { PrismaClient } from "@prisma/client";

const debug = Debug("deseo:movie");

const prisma = new PrismaClient();

const createMovie = async (name, img, summary) => {
  const existingMovie = await prisma.movie.findFirst({
    where: {
      name: name,
      deleted: false,
    },
  });
  if (!existingMovie) {
    const movie = await prisma.movie.create({
      data: {
        name,
        img,
        summary,
      },
    });

    return movie;
  }
  Logger.debug(
    `file: @services/movie, func:createMovie(),message: ${name} already exist with details ${JSON.stringify(
      existingMovie
    )}`
  );
  throw new Error(Constants.movie.messages.MOVIE_ALREADY_EXISTS);
};

const getMovie = async (id) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id,
      deleted: false,
    },
    select: {
      id: true,
      name: true,
      img: true,
      summary: true,
    },
  });
  debug(movie);
  if (movie) {
    return movie;
  }
  throw new Error(Constants.movie.messages.MOVIE_NOT_FOUND);
};

const listMovies = async (take, bookmark, search) => {
  let skip = 0;

  if (bookmark && take !== undefined && take > 0) {
    skip = 1;
  }

  const or = search
    ? {
        OR: [{ movieName: { contains: search, mode: "insensitive" } }],
      }
    : {};

  const movie = await prisma.movie.findMany({
    skip,
    take,
    ...(bookmark && { cursor: { id: bookmark } }),
    where: {
      deleted: false,
      ...or,
    },
    orderBy: {
      id: "asc",
    },
    select: {
      id: true,
      name: true,
      img: true,
      summary: true,
    },
  });
  if (movie.length > 0) {
    const index = movie.length - 1;
    const lastInResults = movie[index]; // Remember: zero-based index! :)
    return [movie, lastInResults.id];
  }
  return [movie];
};

const updateMovie = async (name, img, summary, id) => {
  const movie = await getMovie(id);
  if (movie) {
    const updatedMovie = await prisma.movie.update({
      where: { valid_record: { id: movie.id, deleted: false } },
      data: { name, img, summary },
    });

    if (updatedMovie) {
      return updatedMovie;
    }
  }
  throw new Error(Constants.movie.messages.MOVIE_NOT_FOUND);
};
const deleteMovie = async (id) => {
  const movie = await getMovie(params);
  if (movie) {
    const deletedMovie = await prisma.movie.delete({
      where: {
        valid_record: {
          id,
          deleted: false,
        },
      },
    });
    if (deletedMovie) {
      return deletedMovie;
    }
  }
  throw new Error(Constants.movie.messages.MOVIE_NOT_FOUND);
};
export { createMovie, getMovie, listMovies, updateMovie, deleteMovie };
