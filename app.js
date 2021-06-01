const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');
const log = console.log;

//create add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Body for the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//create remove command
yargs.command({
  command: 'remove',
  describe: 'Remove a  note',
  builder: {
    title: {
      describe: 'title of the removing note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNotes(argv.title);
  },
});

yargs.command({
  command: 'read',
  describe: 'Listing the note',
  builder: {
    title: {
      describe: 'Title for the note',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.command({
  command: 'list',
  describe: 'Listing all notes',
  handler() {
    notes.listNotes();
  },
});

// if (command === 'add') {
//   log('Note add is called..');
// } else if (command === 'remove') {
//   log('Note remove is called..');
// }
yargs.parse();
