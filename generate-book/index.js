const {BookService} = require("./service/BookService");

exports.consumePubSub = (event, context) => {
    const message = event.data
        ? Buffer.from(event.data, 'base64').toString()
        : 'Hello, World';
    if( message !== 'Hello, World'){
        console.log('Start process');
        let bookService = new BookService();
        bookService.initBook(message);
        bookService.launchProcess();
    }else{
        console.log('No message received');
    }

};
/*

const message = "{\"name\": \"Premier livre de cuisine !\", \"description\": \"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris dolor, sodales ut dolor sit amet, semper ultricies elit. Fusce blandit fermentum ullamcorper. Integer eu dolor elit. Duis diam tellus, ultrices quis accumsan vel, congue nec erat. In ac imperdiet sapien, rhoncus scelerisque sem. Praesent et sodales urna, a dictum urna. Vivamus vel dignissim ante. Suspendisse mattis fringilla metus, in condimentum odio facilisis molestie.\", \"cover_path\": \"templates/cover_page/template.html\", \"description_path\": \"templates/book_description/template - description.html\", \"cover_picture_path\": \"https://storage.googleapis.com/tipschef-dev-recipes/1/book_cover/31365ef1-638d-493c-8593-e9bcc69ece8a_test.jpg\", \"recipe_template\": [{\"recipe_id\": 1, \"template_path\": \"templates/recipe/template - recipe.html\", \"recipe_name\": \"Clafoutis \u00e0 la cerise\", \"thumbnail_path\": \"https://storage.googleapis.com/tipschef-dev-recipes/1/1/3_93125_origin.jpg\", \"portion_number\": \"4\", \"portion_unit\": \"Personnes\", \"total_time\": \"55MIN\", \"ingredient_list\": \"<p> 5 cuill\u00e8res de farine</p><p> 5 cuill\u00e8res de sucre roux</p><p> 25 cl de lait</p><p> 1 pinc\u00e9e de sel</p><p> 1 cuill\u00e8re \u00e0 caf\u00e9 d'extrait de vanille</p><p> 1 sachet de sucre vanill\u00e9</p><p> 2   oeuf</p><p> 60 g de beurre</p>\", \"instruction_list\": \"<p> 1 - Lavez et \u00e9queutez les cerises.</p><p> 2 - Allumez votre four \u00e0 thermostat 6/7 (180/200\u00b0C). Dans un plat \u00e0 tarte, mettez le beurre puis enfournez-le.</p><p> 3 - Battez les oeufs en omelette, ajoutez la pinc\u00e9e de sel ainsi que le sucre. M\u00e9langez bien (au fouet ou au robot). Ajoutez l'extrait de vanille, m\u00e9langez et jetez la farine en pluie. M\u00e9langez bien jusqu'\u00e0 obtenir un liquide \u00e9pais et onctueux.</p><p> 4 - Sortez le beure fondu du four, ajoutez-le au liquide puis ajoutez le lait tout en remuant. Une fois m\u00e9lang\u00e9, ajoutez les cerises \u00e0 la pr\u00e9paration.</p><p> 5 - Avec un essuie-tout, \u00e9talez le beurre rest\u00e9 dans le plat pour le graisser, puis ajoutez la pr\u00e9paration. Ajoutez quelques noisettes de beurre par dessus</p><p> 6 - Enfournez 45 mn (jusqu'\u00e0 ce que le dessus commence \u00e0 bien dorer). D\u00e8s la sortie du four, saupoudrez de sucre vanill\u00e9.</p><p> 7 - Servez ti\u00e8de.</p>\"}, {\"recipe_id\": 2, \"template_path\": \"templates/recipe/template - recipe.html\", \"recipe_name\": \"G\u00e2teau au chocolat fondant rapide\", \"thumbnail_path\": \"https://storage.googleapis.com/tipschef-dev-recipes/1/2/8_69747_origin.jpg\", \"portion_number\": \"6\", \"portion_unit\": \"Personnes\", \"total_time\": \"40MIN\", \"ingredient_list\": \"<p> 200 g de chocolat p\u00e2tisser</p><p> 50 g de farine</p><p> 100 g de sucre en poudre</p><p> 100 g de beurre</p><p> 3   oeufs</p>\", \"instruction_list\": \"<p> 1 - Pr\u00e9chauffez votre four \u00e0 180\u00b0C (thermostat 6). Dans une casserole, faites fondre le chocolat et le beurre coup\u00e9 en morceaux \u00e0 feu tr\u00e8s doux.</p><p> 2 - Dans un saladier, ajoutez le sucre, les oeufs, la farine. M\u00e9langez.</p><p> 3 - Ajoutez le m\u00e9lange chocolat/beurre. M\u00e9langez bien.</p><p> 4 - Beurrez et farinez votre moule puis y versez la p\u00e2te \u00e0 g\u00e2teau.</p><p> 5 - Faites cuire au four environ 20 minutes.</p><p> 6 - A la sortie du four le g\u00e2teau ne para\u00eet pas assez cuit. C'est normal, laissez-le refroidir puis d\u00e9moulez- le.</p>\"}], \"id\": 17, \"author_name\": \"a\", \"u_id\": \"e8832a49-3d20-4cb6-8334-4535e2a9f30f\"}";
console.log('Start process');
let bookService = new BookService();
bookService.initBook(message);
bookService.launchProcess();

*/
