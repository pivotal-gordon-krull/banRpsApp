const {RoundResult} = require("../src/rps");

function FakeRoundRepo() {
    let isEmpty = true;

    this.isEmpty = () => {
        return isEmpty;
    }

    this.save = () => {
        isEmpty = false;
    }

    this.getAll = () => {

    }
}

fdescribe('fake round repo', () => {
    describe('when no rounds have been saved', () => {
        it('should be empty', function () {
            let repo = new FakeRoundRepo();

            expect(repo.isEmpty()).toBeTruthy();
        });
    });

    describe('when rounds have been saved', () => {
        it('should not be empty', function () {
            let repo = new FakeRoundRepo();

            repo.save(new RoundResult());

            expect(repo.isEmpty()).toBeFalsy();
        });
    });
});