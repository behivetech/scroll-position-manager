import React, {useContext, useRef, useState} from 'react';
import {render, fireEvent, waitFor, screen} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import {
    ScrollPositionProvider,
    ScrollPositionContext,
} from '../src/ScrollPositionProvider';
import useScrollPosition, {scroll} from '../src/useScrollPosition';

describe('ScrollPositionProvider and useScrollPosition', () => {
    const newPosition = {posX: 10, posY: 10};

    const MockComponent = () => {
        const thisRef = useScrollPosition('mockComponent');
        const [showDiv, setShowDiv] = useState(true);
        const parentStyles = {height: '10px', overflow: 'scroll'};
        const childStyles = {height: '20px'};

        function handleScrollClick(event) {
            event.prevenDefault();

            scroll(event.target, newPosition);
        }

        function handleToggleClick(event) {
            event.prevenDefault();

            setShowDiv(!showDiv);
        }

        return (
            <div>
                <button data-testid="button-toggle" onClick={handleToggleClick}>
                    toggle
                </button>
                <button data-testid="button-scroll" onClick={handleScrollClick}>
                    toggle
                </button>
                {showDiv && (
                    <div data-testid="parent" ref={thisRef} style={parentStyles}>
                        <div style={childStyles} />
                    </div>
                )}
            </div>
        );
    };

    const {getByTestId, getByRole} = render(
        <ScrollPositionProvider>
            <MockComponent />
        </ScrollPositionProvider>,
    );

    it('should set the scroll postion when the component is mounted', async () => {
        const parent = getByTestId('mock-parent');
        const buttonToggle = getByTestId('button-toggle');
        const buttonScroll = getByTestId('button-scroll');
        console.log(parent);

        fireEvent.click(buttonScroll);
        fireEvent.click(buttonToggle);
        fireEvent.click(buttonToggle);

        await waitFor(() => screen.getByTestId('parent'));
        console.log(parent);
    });
});
