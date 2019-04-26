const {FakeRoundRepo} = require("../rps/src/fakeRoundRepo");

const React = require("react")
const ReactDOM = require("react-dom")

const {RoundResult, Round} = require("rps")

const {HistoryDisplay} = require("./src/components/HistoryDisplay")
const {PlayForm} = require("./src/components/PlayForm")

let repo = new FakeRoundRepo()

repo.save(new RoundResult("foo", "bar", "invalid"))
repo.save(new RoundResult("rock", "rock", "tie"))

let round = new Round(repo)

class App extends React.Component {
    render() {
        return <div>
            <PlayForm round={round}/>
            <HistoryDisplay round={round}/>
        </div>
    }
}

ReactDOM.render(
    <App/>,
    document.querySelector("#app")
)