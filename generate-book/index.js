const {BookService} = require("./service/BookService");

exports.consumePubSub = (event, context) => {
    const message = event.data
        ? Buffer.from(event.data, 'base64').toString()
        : 'Hello, World';
    if( message !== 'Hello, World'){
        console.log('Start process');
        let bookService = new BookService();
        bookService.initBook(message);
        return new Promise((resolve, reject) => {
            bookService.launchProcess();
        });
    }else{
        console.log('No message received');
    }

};
