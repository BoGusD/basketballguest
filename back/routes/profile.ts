import express, { Request, Response } from 'express';
import multer from 'multer';
import fs from 'fs';

//env config
require('dotenv').config();

const mongoClient = require('../controllers/authControl').mongoDB;
const router = express.Router();

router.use('/images', express.static('images'));

const dir = './images';
const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, dir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    let newFileName = new Date().valueOf() + file.originalname;
    cb(null, newFileName);
  },
});

const limits = {
  fileSize: 2048 * 2048 * 2,
};
const upload = multer({ storage, limits });

// 이미지 가져오기
router.get('/', (req: Request, res: Response) => {
  res.send(req.file);
});

router.post(
  '/userdata',
  upload.single('img'),
  async (req: Request, res: Response) => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);
    let imgpath = req.file?.filename;
    let logindata = {
      id: req.body.id.replaceAll('"', ''),
      pw: req.body.pw.replaceAll('"', ''),
      userName: req.body.userName.replaceAll('"', ''),
      email: req.body.email.replaceAll('"', ''),
      userImg: `${process.env.SERVER_URL}/images/${imgpath}`,
    };

    const result = await mongoClient.userData(logindata);
    res.send(JSON.stringify(result));
  }
);

module.exports = router;
