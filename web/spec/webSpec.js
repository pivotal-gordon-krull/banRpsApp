import * as ReactDOM from "react-dom";
import * as React from "react";

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

            document.querySelector('button').click();

            expect(domFixture.innerText).toContain('INVALID!');
        });
    })
})