const fs = require('fs');
const chalk = require('chalk');
const { title } = require('process');
const log = console.log;
const getNotes = () => {
  return 'Yours notes...';
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (note) {
    log(chalk.bgCyan('Title') + ' ' + chalk.cyan(note.title));
    log(chalk.bgYellow('Body') + ' ' + chalk.yellow(note.body));
  } else {
    log(chalk.bgRed('note not found..'));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  if (notes.length === 0) {
    log(chalk.bgRed('No notes to list'));
    return;
  }
  notes.forEach((note) => {
    log(chalk.bgCyan('Title') + ' ' + chalk.cyan(note.title));
    log(chalk.bgYellow('Body') + ' ' + chalk.yellow(note.body));
  });
};

const removeNotes = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);
  if (notes.length === notesToKeep.length) {
    log(chalk.bgRed('No match found..'));
  } else {
    log(title + chalk.bgGreen(' removed successfully..'));
    saveNotes(notesToKeep);
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title,
      body,
    });
    saveNotes(notes);
    log('New note added!!..');
  } else {
    log('Title taken...');
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNotes: removeNotes,
  listNotes: listNotes,
  readNote: readNote,
};
