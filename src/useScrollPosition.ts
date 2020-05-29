import {useCallback, useContext, useEffect, useLayoutEffect, useRef} from 'react';

import {ScrollPositionContext, PositionsKey} from './ScrollPositionProvider';

interface ScrollPosition {
    posX: number;
    posY: number;
}

export function scroll(target: HTMLElement, {posX, posY}: ScrollPosition): void {
    if (target instanceof window.Window) {
        target.scrollTo(posX, posY);
    } else {
        /* eslint-disable no-param-reassign */
        target.scrollLeft = posX;
        target.scrollTop = posY;
        /* eslint-enable no-param-reassign */
    }
}

function getScrollPosition(target: HTMLElement): ScrollPosition {
    return target instanceof window.Window
        ? {posX: target.scrollX, posY: target.scrollY}
        : {posX: target.scrollLeft, posY: target.scrollTop};
}

export default function useScrollPosition(nodeName: PositionsKey) {
    const thisRef = useRef<HTMLDivElement>(null);
    const {getNodePos, setNodePos} = useContext(ScrollPositionContext);

    const setNode = useCallback(() => {
        if (thisRef.current !== null) {
            setNodePos({[nodeName]: getScrollPosition(thisRef.current)});
        }
    }, [getNodePos, thisRef.current, nodeName, setNodePos]);

    // Restore Scroll Position
    useLayoutEffect(() => {
        const pos = getNodePos(nodeName);

        if (pos && thisRef.current !== null) {
            scroll(thisRef.current, pos);
        }
    }, [getNodePos, thisRef.current]);

    // Set Scroll Position
    useEffect(() => setNode, [thisRef.current]);
    return thisRef;
}
