import Books from '../model/books';

// let Books;
// fs.readFile('./model/books.json', (error, data) => {
//   if (error) throw error;
//   Books = JSON.parse(data);
// });

const validateInput = {
  logInInput(req, res, next) {
    if (typeof req.body.username === 'undefined') {
      return res.status(401).json({
        message: 'Username field must not be empty'
      });
    } else if (typeof req.body.password === 'undefined') {
      return res.status(401).send({
        message: 'Password field must not be empty'
      });
    }
    return next();
  },

  addBookInput(req, res, next) {
    if (typeof req.body.title === 'undefined') {
      return res.status(401).json({
        message: 'Title field must not be empty'
      });
    } else if (typeof req.body.description === 'undefined') {
      return res.status(401).send({
        message: 'Description field must not be empty'
      });
    } else if (typeof req.body.author === 'undefined') {
      return res.status(401).send({
        message: 'Author field must not be empty'
      });
    }
    return next();
  },

  bookNameExists(req, res, next) {
    if (Books.some(book => req.title === book.title)) {
      return res.status(401).json({
        message: 'Book title already exist'
      });
    }
    return next();
  }
};

export default validateInput;
