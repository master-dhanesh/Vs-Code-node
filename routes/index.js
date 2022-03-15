var express = require('express');
var router = express.Router();

const fs = require('fs')
const path = require('path')
const FolderPath = path.join(__dirname, '..', 'public', 'Files');

/* GET home page. */
router.get('/', function (req, res, next) {
  let files = fs.readdirSync(FolderPath)
  res.render('index', { files, filedata: '', filename: '' });
});

/* GET /create page. */
router.get('/create', function (req, res, next) {
  fs.writeFileSync(path.join(FolderPath, req.query.filename), '');
  res.redirect('/');
});

/* GET /read/:filename page. */
router.get('/read/:filename', function (req, res, next) {
  let files = fs.readdirSync(FolderPath)
  let filedata = fs.readFileSync(path.join(FolderPath, req.params.filename), 'utf8');
  res.render('index', { files, filedata, filename: req.params.filename });
  // res.redirect('/');
});

/* POST /save/:filename page. */
router.post('/save/:filename', function (req, res, next) {
  fs.writeFileSync(path.join(FolderPath, req.params.filename), req.body.filedata);
  res.redirect(`/read/${req.params.filename}`);
});

/* GET /delete/:filename page. */
router.get('/delete/:filename', function (req, res, next) {
  fs.unlinkSync(path.join(FolderPath, req.params.filename));
  res.redirect(`/`);
});

module.exports = router;
