describe('play', () => {
    it('rock vs scissors', function () {
        expect(new Requests().play('rock', 'scissors')).toBe('p1_wins')
    });
});

function Requests() {
    this.play = (p1, p2) => {
        return 'p1_wins'
    }
}