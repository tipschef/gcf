exports.RecipeTemplate = class {
    constructor(recipe_id, template_path, recipe_name, thumbnail_path, portion_number, portion_unit, total_time, ingredient_list, instruction_list) {
        this.recipe_id = recipe_id;
        this.template_path = template_path;
        this.recipe_name = recipe_name;
        this.thumbnail_path = thumbnail_path;
        this.portion_number = portion_number;
        this.portion_unit = portion_unit;
        this.total_time = total_time;
        this.ingredient_list = ingredient_list;
        this.instruction_list = instruction_list;
    }

}
