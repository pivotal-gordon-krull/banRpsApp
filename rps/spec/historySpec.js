const {Round, RoundResult} = require('../src/rps')

fdescribe('history', () => {
    it('should save the game result after a game has been played and is invalid', function () {
        let spyRepo = jasmine.createSpyObj('repo', ['save']);

        let playRoundObserver = {
            invalid() {
            }
        }

        new Round().play('rock', 'sailboat', playRoundObserver, spyRepo);

        expect(spyRepo.save).toHaveBeenCalledWith(new RoundResult('rock', 'sailboat', 'invalid'))
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
});