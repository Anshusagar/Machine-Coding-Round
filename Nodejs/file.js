const fs  = require('fs');
fs.writeFileSync('source.txt', 'This is the source file content.');
fs.readFileSync('source.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
});

fs.writeFileSync('destination.txt', 'This is the destination file content.');
fs.readFileSync('destination.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log('File content:', data);
});

fs.copyFileSync('source.txt', 'destination.txt');
console.log('File copied successfully.');

let s = fs.readFileSync('destination.txt', 'utf8');
console.log('Destination file content:', s);    