const {Book} = require("../model/Book");
const {RecipeTemplate} = require("../model/RecipeTemplate");
const {TemplateList} = require("../model/TemplateList");
const {Template} = require("../model/Template");
const htmlPdf = require('html-pdf');
const fs = require('fs')
const FormData = require('form-data');
let http;
if (process.env.API_PREFIX === 'http://'){
    http = require('http');
}else{
    http = require('https');
}

exports.BookService = class {
    book;
    templates;
    pdf_filename;

    constructor() {

    }

    initBook(message) {
        console.log('Init book');
        const json_book = JSON.parse(message);
        const recipeTemplates = [];
        for (let recipeTemplate in json_book.recipe_template) {
            recipeTemplates.push(new RecipeTemplate(
                recipeTemplate.recipe_id,
                recipeTemplate.template_path,
                recipeTemplate.recipe_name,
                recipeTemplate.thumbnail_path,
                recipeTemplate.portion_number,
                recipeTemplate.portion_unit,
                recipeTemplate.total_time,
                recipeTemplate.ingredient_list,
                recipeTemplate.instruction_list
            ))
        }
        this.book = new Book(json_book.id,
            json_book.name,
            json_book.description,
            json_book.cover_path,
            json_book.description_path,
            json_book.cover_picture_path,
            json_book.recipe_template,
            json_book.author_name,
            json_book.u_id);
    }

    postPDF() {
        console.log('Post PDF To API');
        const formData = new FormData();
        formData.append('file', this.pdf);
        let options;
        if (process.env.API_PORT !== '0'){
            options = {
                host: process.env.API_DOMAIN,
                port: process.env.API_PORT,
                path: '/v1/book/pdf/'+this.book.id+'/'+this.book.u_id,
                method: 'POST'

            };
        }else{
            options = {
                host: process.env.API_DOMAIN,
                path: '/v1/book/pdf/'+this.book.id+'/'+this.book.u_id,
                method: 'POST'

            };
        }

        if (process.env.API_PREFIX !== 'http://'){
            options.protocol = 'https:';
        }


        const res =  this.makeRequest(formData, options);

    }

    makeRequest(formData, options) {
        console.log('Posting');
        const req = formData.submit(options, (err, res) => {
            if (err) {
                console.log(err);
            }

            const body = []
            res.on('data', (chunk) => body.push(chunk))
            res.on('end', () => {
                const resString = Buffer.concat(body).toString()
                console.log(resString);
            })
        });
    }

    launchProcess() {
        console.log('Launch process');
        const port = process.env.API_PORT !== '0' ? ':'+process.env.API_PORT : '';
        const url = process.env.API_PREFIX + process.env.API_DOMAIN + port + '/v1/book/template';
        console.log('Get templates');
         http.get(url, res => {
            let data = [];

            res.on('data', chunk => {
                data.push(chunk);
            });

            res.on('end', () => {
                const val = JSON.parse(Buffer.concat(data).toString());
                this.convertJsonToBook(val);
                this.generatePDF();
            });
        }).on('error', err => {
            console.log('Error: ', err.message);
        });
    }

    convertJsonToBook(val) {
        console.log('Convert JSON to book');
        const book_description = this.getTemplateArrayFromArray(val.book_descriptions);
        const cover_pages = this.getTemplateArrayFromArray(val.cover_pages);
        const recipes = this.getTemplateArrayFromArray(val.recipes);
        const summaries = this.getTemplateArrayFromArray(val.summaries);

        this.templates = new TemplateList(book_description, cover_pages, recipes, summaries);
    }

    getTemplateArrayFromArray(templateArray) {
        const array = [];
        for (let template of templateArray) {
            array.push(new Template(template.content, template.filename));
        }
        return array;
    }

    generatePDF() {
        console.log('Generate PDF');
        const htmlPDFOptions = {
            'format': 'A3',
            'type': 'pdf',
            'timeout': '100000000'
        };
        let html = this.getCoverHtml();
        html += this.getBookDescriptionHtml();
        html += this.getRecipeHtml();

        htmlPdf.create(html, htmlPDFOptions).toStream((err, stream) => {
           if (err) {
               return console.log(err);
           }
           console.log('PDF Generated');
           this.pdf = stream;
           this.postPDF();
        });
    }



    getCoverHtml() {
        for (let template of this.templates.cover_pages){
            if (template.filename === this.book.cover_path){
                let html = template.content;
                html = html.replace('BOOK_NAME', this.book.name);
                html = html.replace('COOK_USERNAME', this.book.author_name);

                html = html.replace('COVER_SOURCE', this.book.cover_picture_path);
                return html;
            }
        }
    }

    getBookDescriptionHtml() {
        for (let template of this.templates.book_descriptions){
            if (template.filename === this.book.description_path){
                let html = template.content;
                html = html.replace('BOOK_DESCRIPTION', this.book.description);
                return html;
            }
        }
    }

    getRecipeHtml() {
        let final_html = ''
        for (let recipe_tem of this.book.recipe_template) {
            for (let template of this.templates.recipes){
                if (template.filename === recipe_tem.template_path){
                    let html = template.content;
                    html = html.replace('RECIPE_NAME',      recipe_tem.recipe_name);
                    html = html.replace('THUMBNAIL_PATH',   recipe_tem.thumbnail_path);
                    html = html.replace('PORTION_NUMBER',   recipe_tem.portion_number);
                    html = html.replace('PORTION_UNIT',     recipe_tem.portion_unit);
                    html = html.replace('TEMPS_TOTALE',     recipe_tem.total_time);
                    html = html.replace('INGREDIENT_LIST',  recipe_tem.ingredient_list);
                    html = html.replace('INSTRUCTION_LIST', recipe_tem.instruction_list);
                    final_html += html;
                    break;
                }
            }
        }
        return final_html;
    }

}

