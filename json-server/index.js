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

function createNewDate(){
  const date = new Date()
  const month = date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : date.getMonth()
  return `${date.getDate()}.${month}.${date.getFullYear()}`
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

server.post('/notes', (req, res) => {
  try {

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { notes = [] } = db;
    const newId = Number(notes.sort((a, b) => {return b.id - a.id})[0].id) + 1
    const newNote = {
      id: `${newId}`,
      title: 'Новая заметка',
      createdAt: createNewDate(),
      text: ''
    }

    notes.push(newNote)

    fs.writeFile(path.resolve(__dirname, 'db.json'), JSON.stringify(db, null, 4), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
    })

    return res.status(200).json(newNote);
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Failed add new note' });
  }
});

server.delete('/notes/:id', (req, res) => {
  try {
    const { id } = req.params

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

    let { notes = [] } = db;

    let deletedNote = notes.find((el) => el.id === id)

    notes = notes.filter((el) => el.id !== id);

    const newDB = { notes }

    fs.writeFile(path.resolve(__dirname, 'db.json'), JSON.stringify(newDB, null, 4), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
    })

    return res.json(deletedNote);
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Failed to delete note' });
  }
});

server.put('/notes/:id', (req, res) => {
  try {
    const { id } = req.params
    const note= req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));

    let { notes = [] } = db;

    notes = notes.map((el) => {
      if(el.id === id){
        return note
      }
      return el
    });

    const newDB = { notes }

    fs.writeFile(path.resolve(__dirname, 'db.json'), JSON.stringify(newDB, null, 4), (error) => {
      if (error) {
        console.log('An error has occurred ', error);
        return;
      }
    })

    return res.json(note);
  } catch (e) {
    console.log(e);
    return res.status(403).json({ message: 'Failed to delete note' });
  }
});

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
