const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'list_app'
});

app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/list', (req, res) => {
  res.render('list.ejs');
});

app.get('/index', (req, res) => {
  connection.query(
    'SELECT * FROM spirits',
    (error, results) => {
      res.render('index.ejs', {spirits: results});
    }
  );
});

app.get('/new', (req, res) => {
  res.render('new.ejs');
});

app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO spirits (name, details, stock) VALUES (?,?,?)',
    [req.body.spiritName, req.body.spiritDetails, req.body.spiritStock],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM spirits WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM spirits WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {spirit: results[0]});
    }
  );
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE spirits SET stock = ? WHERE id = ?',
    [req.body.spiritStock, req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/alldelete', (req, res) => {
  connection.query(
    'DELETE FROM spirits',
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/selectdelete/:id', (req, res) => {
  connection.query(
    'DELETE FROM spirits WHERE id in(?)',
    [req.params.id],
    (error, results) => {
      res.redirect('/index');
    }
  );
});

app.get('/guard', (req, res) => {
  connection.query(
    'SELECT * FROM guards',
    (error, results) => {
      res.render('guards.ejs', {guards: results});
    }
  );
});

app.get('/new1', (req, res) => {
  res.render('new1.ejs');
});

app.post('/create1', (req, res) => {
  connection.query(
    'INSERT INTO guards (name, details, stock) VALUES (?,?,?)',
    [req.body.guardName, req.body.guardDetails, req.body.guardStock],
    (error, results) => {
      res.redirect('/guard');
    }
  );
});

app.post('/delete1/:id', (req, res) => {
  connection.query(
    'DELETE FROM guards WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/guard');
    }
  );
});

app.get('/edit1/:id', (req, res) => {
  connection.query(
    'SELECT * FROM guards WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit1.ejs', {guard: results[0]});
    }
  );
});

app.post('/update1/:id', (req, res) => {
  connection.query(
    'UPDATE guards SET stock = ? WHERE id = ?',
    [req.body.guardStock, req.params.id],
    (error, results) => {
      res.redirect('/guard');
    }
  );
});

app.get('/alldelete1', (req, res) => {
  connection.query(
    'DELETE FROM guards',
    (error, results) => {
      res.redirect('/guard');
    }
  );
});

app.get('/selectdelete1/:id', (req, res) => {
  connection.query(
    'DELETE FROM guards WHERE id in(?)',
    [req.params.id],
    (error, results) => {
      res.redirect('/guard');
    }
  );
});

app.get('/game', (req, res) => {
  connection.query(
    'SELECT * FROM games',
    (error, results) => {
      res.render('games.ejs', {games: results});
    }
  );
});

app.get('/new2', (req, res) => {
  res.render('new2.ejs');
});

app.post('/create2', (req, res) => {
  connection.query(
    'INSERT INTO games (name, details, stock) VALUES (?,?,?)',
    [req.body.gameName, req.body.gameDetails, req.body.gameStock],
    (error, results) => {
      res.redirect('/game');
    }
  );
});

app.post('/delete2/:id', (req, res) => {
  connection.query(
    'DELETE FROM games WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/game');
    }
  );
});

app.get('/edit2/:id', (req, res) => {
  connection.query(
    'SELECT * FROM games WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit2.ejs', {game: results[0]});
    }
  );
});

app.post('/update2/:id', (req, res) => {
  connection.query(
    'UPDATE games SET stock = ? WHERE id = ?',
    [req.body.gameStock, req.params.id],
    (error, results) => {
      res.redirect('/game');
    }
  );
});

app.get('/alldelete2', (req, res) => {
  connection.query(
    'DELETE FROM games',
    (error, results) => {
      res.redirect('/game');
    }
  );
});

app.get('/selectdelete2/:id', (req, res) => {
  connection.query(
    'DELETE FROM games WHERE id in(?)',
    [req.params.id],
    (error, results) => {
      res.redirect('/game');
    }
  );
});

app.listen(3000);