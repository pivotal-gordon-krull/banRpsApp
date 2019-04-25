describe('play', () => {
    let round, observer;

    beforeEach(() => {
        round = new Round();
    });

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['player1Wins']);
        });

        it('rock vs scissors', function () {
            round.play('rock', 'scissors', observer);

            expect(observer.player1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', function () {
            round.play('scissors', 'paper', observer);

            expect(observer.player1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', function () {
            round.play('paper', 'rock', observer);

            expect(observer.player1Wins).toHaveBeenCalled();
        });
    });

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['player2Wins']);
        });

        it('scissors vs rock', function () {
            round.play('scissors', 'rock', observer);

            expect(observer.player2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', function () {
            round.play('paper', 'scissors', observer);

            expect(observer.player2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', function () {
            round.play('rock', 'paper', observer);

            expect(observer.player2Wins).toHaveBeenCalled();
        });
    });

    describe('draw scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie']);
        });

        it('rock vs rock', function () {
            round.play('rock', 'rock', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper vs paper', function () {
            round.play('paper', 'paper', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('scissors vs scissors', function () {
            round.play('scissors', 'scissors', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

    });

    describe('invalid scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid']);
        });

        it('invalid vs rock', function () {
            round.play('invalid', 'rock', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('rock vs invalid', function () {
            round.play('rock', 'invalid', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('invalid vs invalid', function () {
            round.play('invalid', 'invalid', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});

function Round() {
    this.play = (player1Throw, player2Shape, observer) => {
        if (!['rock', 'paper', 'scissors'].includes(player1Throw) ||
            !['rock', 'paper', 'scissors'].includes(player2Shape)) {
            observer.invalid();
        }
        else if (player1Throw === player2Shape) {
            observer.tie();
        }
        else if (player1Throw === 'rock' && player2Shape === 'scissors' ||
            player1Throw === 'scissors' && player2Shape === 'paper' ||
            player1Throw === 'paper' && player2Shape === 'rock') {
            observer.player1Wins();

        } else {
            observer.player2Wins();
        }
    }
}