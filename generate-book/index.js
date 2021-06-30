const {BookService} = require("./service/BookService");

/*exports.consumePubSub = (event, context) => {
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

};*/


const app = require('./app.js');
const PORT = process.env.PORT || 8080;

app.listen(PORT, () =>
    console.log(`Generate book cloud run listening on port ${PORT}`)
);
