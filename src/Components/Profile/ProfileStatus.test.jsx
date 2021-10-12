import React from "react";
import {create} from 'react-test-renderer'
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
    test("Status from props, should be in the local state", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const instance = component.getInstance()
        expect(instance.state.status).toBe("Keizt");
    });
    test("Should be 1 span from the start", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const root = component.root
        const span = root.findByType("span")
        expect(span).not.toBeNull();
    });
    test("input should't be displayed", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const root = component.root
        expect(() => {
            const input = root.findByType("input")
        }).toThrow();
    });
    test("span textContent should be Keizt", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const root = component.root
        const span = root.findByType("span")
        expect(span.children[0]).toBe("Keizt");
    });
    test("in editMode input should be displayed instead of span", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        const input = root.findByType("input")
        expect(input.props.value).toBe("Keizt");
    });
    test("in editMode span should't be displayed", () => {
        const component = create(<ProfileStatus status={"Keizt"}/>);
        const root = component.root
        const span = root.findByType("span")
        span.props.onDoubleClick()
        expect(() => {
            const span = root.findByType("span")
        }).toThrow();
    });
    test("callback should be called", () => {
        const mockCallback = jest.fn()
        const component = create(<ProfileStatus status={"Keizt"} updateStatusThunkCreator={mockCallback}/>);
        const instance = component.getInstance()
        instance.deActivateEditMode()
        expect(mockCallback.mock.calls.length).toBe(1)

    });
});
