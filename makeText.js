/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const { MarkovMachine } = require('./markov');

if (process.argv[2] === 'file') {
    if (process.argv[3]) {
        fs.readFile(process.argv[3], 'utf8', (err, text) => {
            if (err) {
                console.log('Error: There was an error reading the file. \n', err);
                process.exit(1);
            }
            const machine = new MarkovMachine(text);
            const markovText = machine.makeText();

            fs.writeFile('markov-text.txt', markovText, 'utf8', (err) => {
                if (err) {
                    console.log('Error: There was an error creating the file. \n', err);
                    process.exit(1);
                }
            });
            console.log('### Text has been generated ###');
        });
    } else {
        console.log('Error: You must provide a resource.');
        process.exit(1);
    }
} else if (process.argv[2] === 'url') {
    if (process.argv[3] && process.argv[3].slice(0, 4) === 'http') {
        try {
            console.log('### Requesting URL Data ###');
            const res = axios.get(process.argv[3]);

            res.then(({ data }) => {
                const machine = new MarkovMachine(data);
                const text = machine.makeText();

                fs.writeFile('markov-text.txt', text, 'utf8', (err) => {
                    if (err) {
                        console.log('Error: There was an error creating the file. \n', err);
                        process.exit(1);
                    }
                });
            });
        } catch (err) {
            console.log('Error: There was an error when requesting data from the provided URL. \n', err);
            process.exit(1);
        }
    } else {
        console.log('Error: You must provide a valid url.');
        process.exit(1);
    }
} else {
    console.log('Error: Please provide either a "file" or "url" flag followed by its associated resource.');
    process.exit(1);
}
