const {RoundResult} = require("../src/rps");
const {FakeRoundRepo} = require('../src/fakeRoundRepo')

roundRepoContract(FakeRoundRepo)

function roundRepoContract(RoundRepo) {
    describe('round repo', () => {
        let repo;

        beforeEach(() => {
            repo = new RoundRepo()
        })

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
}

