const {Round, RoundResult} = require('../src/rps')

const {FakeRoundRepo} = require('../src/fakeRoundRepo')

describe('history', () => {
    it('should save the game result after a game has been played and is invalid', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            invalid() {
            }
        }

        new Round(spyRepo).play('rock', 'sailboat', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'sailboat', 'invalid'))
    });

    it('should save the game result after a game has been played and p1 wins', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            player1Wins() {
            }
        }

        new Round(spyRepo).play('rock', 'scissors', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'scissors', 'p1_wins'))
    });

    it('should save the game result after a game has been played and p2 wins', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            player2Wins() {
            }
        }

        new Round(spyRepo).play('scissors', 'rock', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('scissors', 'rock', 'p2_wins'))
    });

    it('should save the game result after a game has been played and is a tie', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            tie() {
            }
        }

        new Round(spyRepo).play('rock', 'rock', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'rock', 'tie'))
    });

    describe('getHistory', () => {
        let repo;

        beforeEach(function () {
           repo = new FakeRoundRepo()
        });

        describe('no one has played', () => {
            it('should tell the observer there are no rounds', function () {
                let observer = jasmine.createSpyObj('observer', ['noRounds'])

                new Round(repo).getHistory(observer, repo)

                expect(observer.noRounds).toHaveBeenCalled()
            });
        });


        describe('games have been played', () => {
            it('should tell the observer all the rounds played', function () {
                repo.save(new RoundResult('rock', 'sailboat', 'invalid'))
                let observer = jasmine.createSpyObj('observer', ['rounds'])

                new Round(repo).getHistory(observer, repo)

                expect(observer.rounds).toHaveBeenCalledWith([new RoundResult('rock', 'sailboat', 'invalid')])
            });
        });

    });
});