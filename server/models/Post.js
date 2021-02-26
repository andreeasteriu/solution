const { Model } = require("objection");

class Post extends Model {
  static get tableName() {
    return "posts";
  }

  // ====================== ADD SCHEMA ======================
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "description"],

      properties: {
        post_id: { type: "integer" },
        title: { type: "string", minLength: 2, maxLength: 41 },
        description: { type: "string", minLength: 2, maxLength: 100 },
      },
      imagePath: {
        type: "string",
        minLength: 5,
        maxLength: 41,
      },
    };
  }
}

module.exports = Post;
