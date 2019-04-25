describe('play', () => {
    it('rock vs scissors', function () {
        const observer = jasmine.createSpyObj('observer', ['p1Wins']);

        new Requests().play('rock', 'scissors', observer);

        expect(observer.p1Wins).toHaveBeenCalled();
    });
});

function Requests() {
    this.play = (p1, p2, observer) => {
        return observer.p1Wins();
    }
}