import  Joi from "joi";

class Schema {
  requestParams = Joi.object({
    id: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        "any.regex": "Invalid id",
      }),
  });

  create = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    img: Joi.string().min(1).max(50).required(),
    summary: Joi.string().min(1).max(200).required(),
  });

  update = Joi.object({
    name: Joi.string().min(1).max(50).required(),
    img: Joi.string().min(1).max(50).required(),
    summary: Joi.string().min(1).max(200).required(),
  });

  list = Joi.object({
    take: Joi.number().integer().min(10).max(50),
    bookmark: Joi.string().max(64).trim().allow(""),
    search: Joi.string().max(64).trim().allow(""),
  });
}

export default new Schema();
