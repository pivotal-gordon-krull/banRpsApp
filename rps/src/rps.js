function Round(repo) {
    this.play = (player1Throw, player2Throw, observer) => {
        new PlayRound(player1Throw, player2Throw, observer, repo).process()
    }

    this.getHistory = (observer) => {
        if (repo.isEmpty()) {
            observer.noRounds();
        } else {
            observer.rounds(repo.getAll())
        }
    }
}

function PlayRound(player1Throw, player2Throw, observer, repo) {
    this.process = () => {
        if (invalid(player1Throw) || invalid(player2Throw)) {
            observer.invalid()
            repo.save(new RoundResult(player1Throw, player2Throw, 'invalid'));
        } else if (tie()) {
            observer.tie()
            repo.save(new RoundResult(player1Throw, player2Throw, 'tie'));
        } else if (player1WinsScenarios()) {
            observer.player1Wins()
            repo.save(new RoundResult(player1Throw, player2Throw, 'p1_wins'));
        } else {
            observer.player2Wins()
            repo.save(new RoundResult(player1Throw, player2Throw, 'p2_wins'));
        }
    }

    function tie() {
        return player1Throw === player2Throw
    }

    function player1WinsScenarios() {
        return player1Throw === THROW.ROCK && player2Throw === THROW.SCISSORS ||
            player1Throw === THROW.SCISSORS && player2Throw === THROW.PAPER ||
            player1Throw === THROW.PAPER && player2Throw === THROW.ROCK
    }

    function invalid(playerThrow) {
        return VALID_THROWS.includes(playerThrow) === false
    }

    const THROW = {
        ROCK: 'rock',
        SCISSORS: 'scissors',
        PAPER: 'paper'
    }

    const VALID_THROWS = [THROW.ROCK, THROW.SCISSORS, THROW.PAPER]
}

function RoundResult(p1Throw, p2Throw, result) {
    this.p1Throw = p1Throw;
    this.p2Throw = p2Throw;
    this.result = result;

}

module.exports = {Round, RoundResult}