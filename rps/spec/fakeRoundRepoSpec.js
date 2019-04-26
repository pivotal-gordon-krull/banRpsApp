const {RoundResult} = require("../src/rps");
const {FakeRoundRepo} = require('../src/fakeRoundRepo')

describe('fake round repo', () => {
    let repo;

    beforeEach(function () {
        repo = new FakeRoundRepo();
    });
    describe('when no rounds have been saved', () => {
        it('should be empty', function () {
            expect(repo.isEmpty()).toBeTruthy();
        });
    });

    describe('when rounds have been saved', () => {
        it('should not be empty', function () {
            repo.save(new RoundResult());

            expect(repo.isEmpty()).toBeFalsy();
        });

        it('should return saved rounds', function () {
            const round = new RoundResult();
            repo.save(round);

            expect(repo.getAll()).toEqual([round]);
        });
    });
});