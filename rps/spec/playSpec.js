describe('play', () => {
    let requests, observer;

    beforeEach(() => {
        requests = new Requests();
    });

    describe('player 1 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p1Wins']);
        });

        it('rock vs scissors', function () {
            requests.play('rock', 'scissors', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('scissors vs paper', function () {
            requests.play('scissors', 'paper', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });

        it('paper vs rock', function () {
            requests.play('paper', 'rock', observer);

            expect(observer.p1Wins).toHaveBeenCalled();
        });
    });

    describe('player 2 wins scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['p2Wins']);
        });

        it('scissors vs rock', function () {
            requests.play('scissors', 'rock', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('paper vs scissors', function () {
            requests.play('paper', 'scissors', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });

        it('rock vs paper', function () {
            requests.play('rock', 'paper', observer);

            expect(observer.p2Wins).toHaveBeenCalled();
        });
    });

    describe('tie scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['tie']);
        });

        it('rock vs rock', function () {
            requests.play('rock', 'rock', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('paper vs paper', function () {
            requests.play('paper', 'paper', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

        it('scissors vs scissors', function () {
            requests.play('scissors', 'scissors', observer);

            expect(observer.tie).toHaveBeenCalled();
        });

    });

    describe('invalid scenarios', () => {
        beforeEach(() => {
            observer = jasmine.createSpyObj('observer', ['invalid']);
        });

        it('invalid vs rock', function () {
            requests.play('invalid', 'rock', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('rock vs invalid', function () {
            requests.play('rock', 'invalid', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });

        it('invalid vs invalid', function () {
            requests.play('invalid', 'invalid', observer);

            expect(observer.invalid).toHaveBeenCalled();
        });
    });
});

function Requests() {
    this.play = (p1, p2, observer) => {
        if (!['rock', 'paper', 'scissors'].includes(p1) ||
            !['rock', 'paper', 'scissors'].includes(p2)) {
            observer.invalid();
        }
        else if (p1 === p2) {
            observer.tie();
        }
        else if (p1 === 'rock' && p2 === 'scissors' ||
            p1 === 'scissors' && p2 === 'paper' ||
            p1 === 'paper' && p2 === 'rock') {
            observer.p1Wins();

        } else {
            observer.p2Wins();
        }
    }
}