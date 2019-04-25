import * as ReactDOM from "react-dom";
import * as React from "react";

class RPSApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    submitHandler() {
        this.setState({
            result: 'INVALID!'
        })
    }

    render() {
        return <div>
            {this.state.result}
            <button onClick={this.submitHandler.bind(this)}>PLAY</button>
        </div>
    }
}

describe("play form", function () {
    describe("when the play use case tells the UI the input is invalid", function () {
        it('should tell the user that their input is invalid', function () {
            let domFixture = document.createElement('div');
            document.body.appendChild(domFixture);

            let alwaysInvalidRequest = {
                play: (p1, p2, observer) => observer.invalid()
            }

            ReactDOM.render(
                <RPSApp requests={alwaysInvalidRequest}/>,
                domFixture
            );


            expect(domFixture.innerText).not.toContain('INVALID!');

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('INVALID!');
        });
    })
})