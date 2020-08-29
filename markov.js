/** Textual markov chain generator */

class MarkovMachine {
    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter((c) => c !== '');
        this.makeChains();
        // this.text = '';
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        const uniqueWords = new Set(this.words);

        this.chains = this.words.reduce((objChain, val, idx) => {
            if (uniqueWords.has(val)) {
                if (objChain.hasOwnProperty(val)) {
                    objChain[val].push(this.words[idx + 1] || null);
                } else {
                    objChain[val] = [this.words[idx + 1] || null];
                }
                return objChain;
            }
        }, {});
    }

    /** return random text from chains */
    makeText(numWords = 100) {
        const chainsKeys = Array.from(Object.keys(this.chains));
        let text = '';
        for (let i = 0; i < numWords; i++) {
            const randomKey = chainsKeys[Math.floor(Math.random() * chainsKeys.length)];
            const randomKeyValue = this.chains[randomKey];
            const randomWord = randomKeyValue[Math.floor(Math.random() * randomKeyValue.length)];

            if (randomWord === null) {
                break;
            } else {
                text += `${randomWord} `;
            }
        }
        console.log('### MarkovMachine generating text ###');
        return text;
    }
}

module.exports = {
    MarkovMachine,
};
