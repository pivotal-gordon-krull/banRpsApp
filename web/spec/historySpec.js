import * as ReactDOM from "react-dom";

const React = require("react")
const {RoundResult} = require("rps")
const {HistoryDisplay} = require("../src/components/HistoryDisplay")

describe("Displaying History", function () {
    let domFixture;

    beforeEach(function () {
        setupDOM()
    });

    afterEach(function () {
        cleanUpDOM();
    });

    describe("when the game module says there are no rounds", function () {
        beforeEach(function () {
            let requests = {
                getHistory(ui) {
                    ui.noRounds()
                }
            }

            renderHistory(requests)
        })

        it("displays 'NO ROUNDS'", function () {
            expect(page()).toContain("NO ROUNDS")
        })
    })

    describe("when the game module says there are rounds", function () {
        beforeEach(function () {
            let requests = {
                getHistory(ui) {
                    ui.rounds([new RoundResult("foo", "baz", "bar")])
                }
            }

            renderHistory(requests)
        })

        it("displays the rounds data", function () {
            expect(page()).toContain("foo")
            expect(page()).toContain("bar")
            expect(page()).toContain("baz")
        })
    })

    function renderHistory(round) {
        renderComponent(<HistoryDisplay round={round}/>)
    }

    function setupDOM() {
        domFixture = document.createElement("div")
        document.body.appendChild(domFixture)
    }

    function cleanUpDOM() {
        domFixture.remove()
    }

    function page() {
        return domFixture.innerText
    }

    function renderComponent(component) {
        ReactDOM.render(
            component,
            domFixture
        )
    }
})