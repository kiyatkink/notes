const fs = require('fs');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 800);
  });
  next();
});

function dateToNumber (stringDate) {
  let [day, month, year] = stringDate.split('.')
  const date = new Date(`${year}-${month}-${day}`)
  return date.getTime()
}

const articlesOrderType = {
  'ask': (array) => {
    array = array.sort((a, b) => {
      return dateToNumber(a.createdAt) - dateToNumber(b.createdAt)
    })
    return array
  },
  'desk': (array) => {
    array = array.sort((a, b) => {
      return dateToNumber(b.createdAt) - dateToNumber(a.createdAt)
    })
    return array
  }
}
function checkWordInNote (array, _search) {
  array = array.filter((note) => {
    if (note.title.toString().toLowerCase().includes(_search.toLowerCase())) {
      return true
    }
    return false
  })

  return array
}

// Эндпоинт на POST для заметок
server.post('/notes', (req, res) => {});

// Эндпоинт на GET для заметок по id
server.get('/notes/:id', (req, res) => {});

// Эндпоинт на GET для всех заметок
server.get('/notes', (req, res) => {
  const { _page, _limit, _order = 'desk', _search } = req.query

  try {
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

    let { notes = [] } = db;

    notes = articlesOrderType[_order](notes)

    if (_search) {
      notes = checkWordInNote(notes, _search)
    }

    if (_page && _limit) {
      const begin = (_page - 1) * _limit
      const end = _page * _limit
      notes = notes.slice(begin, end)
    }

    if (notes) {
      return res.json(notes);
    }

    return res.status(403).json({ message: 'Failed to get notes' });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e.message });
  }
});

server.use(router);

// запуск сервера
server.listen(8000, () => {
  console.log('server is running on 8000 port');
});
