const {Round, RoundResult} = require('../src/rps')
const {FakeRoundRepo} = require('./fakeRoundRepo')


fdescribe('history', () => {
    it('should save the game result after a game has been played and is invalid', function () {
        let repo = new FakeRoundRepo();

        let playRoundObserver = {
            invalid() {
            }
        }

        new Round().play('rock', 'sailboat', playRoundObserver, repo);

        expect(repo.getAll()).toEqual([new RoundResult('rock', 'sailboat', 'invalid')])

    });

    it('should save the game result after a game has been played and p1 wins', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            player1Wins() {
            }
        }

        new Round().play('rock', 'scissors', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'scissors', 'p1_wins'))
    });

    it('should save the game result after a game has been played and p2 wins', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            player2Wins() {
            }
        }

        new Round().play('scissors', 'rock', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('scissors', 'rock', 'p2_wins'))
    });

    it('should save the game result after a game has been played and is a tie', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            tie() {
            }
        }

        new Round().play('rock', 'rock', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'rock', 'tie'))
    });

    describe('getHistory', () => {
        describe('no one has played', () => {
            it('should tell the observer there are no rounds', function () {
                let stubRepo = {
                    isEmpty() {
                        return true
                    }
                }

                let observer = jasmine.createSpyObj('observer', ['noRounds'])

                new Round().getHistory(observer, stubRepo)

                expect(observer.noRounds).toHaveBeenCalled()
            });
        });


        describe('games have been played', () => {
            it('should tell the observer all the rounds played', function () {
                let stubRepo = {
                    isEmpty() {
                        return false
                    },
                    getAll() {
                        return [new RoundResult('rock', 'sailboat', 'invalid')]
                    }
                }
                let observer = jasmine.createSpyObj('observer', ['rounds'])

                new Round().getHistory(observer, stubRepo)

                expect(observer.rounds).toHaveBeenCalledWith([new RoundResult('rock', 'sailboat', 'invalid')])
            });
        });

    });
});