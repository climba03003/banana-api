"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  lookup: async ctx => {
    let entities = [];
    if (ctx.query.name) {
      // const JPName = await strapi.services.character.find({
      //   JPName: ctx.query.name
      // });
      // const ENName = await strapi.services.character.find({
      //   ENName: ctx.query.name
      // });
      // const CNName = await strapi.services.character.find({
      //   CNName: ctx.query.name
      // });
      // entities = entities.concat(JPName, ENName, CNName);
      const lookup = await strapi
        .query("character")
        .model.query(qb => {
          qb.where("JPName", ctx.query.name)
            .orWhere("ENName", ctx.query.name)
            .orWhere("CNName", ctx.query.name)
            .orWhere("Nicknames", "LIKE", `%${ctx.query.name}%`);
        })
        .fetch();
      entities = entities.concat(lookup);
    }

    return entities.map(entity =>
      sanitizeEntity(entity, { model: strapi.models.character })
    );
  }
};