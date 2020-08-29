const { MarkovMachine } = require('./markov');

describe('Testing MarkovMachine', () => {
    let machine;

    beforeEach(() => {
        machine = new MarkovMachine(
            'This sentence is sample text. Great test is a good text for life. This is nice. Yes. Hello life.'
        );
    });

    test('machine.words should be an array containing sample text', () => {
        expect(machine.words).toEqual(expect.any(Array));
        expect(machine.words).toEqual(expect.arrayContaining(['sentence', 'sample']));
    });

    test('machine.chains should be an object with keys having array values', () => {
        expect(machine.chains).toEqual(expect.any(Object));
        expect(machine.chains).toEqual(
            expect.objectContaining({
                This: expect.any(Array),
            })
        );
    });

    test('machine.makeText() should return a string containing text from the given sample text', () => {
        expect(machine.makeText()).toEqual(expect.any(String));
        expect(machine.makeText()).not.toEqual(expect.stringContaining('yellow'));
    });
});
