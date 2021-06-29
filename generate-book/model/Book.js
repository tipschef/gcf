exports.Book = class {
    constructor(id, name, description, cover_path, description_path, cover_picture_path, recipe_template, author_name, u_id) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.cover_path = cover_path;
        this.description_path = description_path;
        this.cover_picture_path = cover_picture_path;
        this.recipe_template = recipe_template;
        this.author_name = author_name;
        this.u_id = u_id;
    }
}
