import fs from 'fs';
import jwt from 'jsonwebtoken';
import { applyPatch } from 'rfc6902';
import gm from 'gm';
import cloudinary from 'cloudinary';
import request from 'request';
import dotenv from 'dotenv';

const Books = [];

// fs.readFile('./model/books.json', (error, data) => {
//   if (error) throw error;
//   Books = JSON.parse(data);
// });
dotenv.config();

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

export default {
  /**
   * login a new user
   * @param {object} req request object from input
   * @param {object} res reponse
   * @returns {object} json rsponse
   */
  login(req, res) {
    const token = jwt.sign(
      {
        username: req.body.username
      },
      process.env.SECRET
    );
    res.status(201).send({
      success: true,
      message: `Succesfully logged in as ${req.body.username}`,
      token
    });
  },

  /**
   * Add new user
   * @param {object} req request object from input with title, description and author as keys
   * @param {object} res response
   * @returns {object} json response
   */
  addBook(req, res) {
    applyPatch(Books, [{ op: 'add', path: '/-', value: req.body }]);
    res.status(201).json({
      success: true,
      message: `Book with title:- ${req.body.title} succesfully created`
    });
  },

  /**
   * create thumbnail
   * @param {object} req contains image url to be downloaded with key urlImage
   * @param {object} res return
   * @returns {object} returns url link of thumbnail
   */
  createThumbnail(req, res) {
    const dir = `${__dirname}/thumbnail`;
    const url = req.body.urlImage;
    const { fileName } = req.body;
    gm(request(url)).resize(50, 50, '!')
      .write(`${dir}/${fileName}.png`, (error) => {
        if (!error) {
          cloudinary.uploader.upload(`${dir}/${fileName}.png`, (result) => {
            res.status(201).json({
              success: true,
              thumbnailUrl: result.url,
              message: 'Thumbnail created successfully'
            });
          });
        } else {
          res.status(400).json({
            error
          });
        }
      });

    // });
  }
};
