import React, {createContext, useCallback, useState} from 'react';

interface Props {
    children: React.ReactNode;
}

type Position =
    | {
          posX: number;
          posY: number;
      }
    | undefined;

interface Positions {
    [nodeName: string]: Position;
}

export type PositionsKey = keyof Positions;

interface Context {
    getNodePos: (nodeName: PositionsKey) => Position;
    setNodePos: (node: object) => void;
}

interface ProviderProps extends Props {
    value: Context;
}

const defaultPosition = {posX: 0, posY: 0};
const DEFAULT_CONTEXT: Context = {
    getNodePos: () => defaultPosition,
    setNodePos: () => undefined,
};

export const ScrollPositionContext = createContext<Context>(DEFAULT_CONTEXT);

const ContextProvider: React.FC<ProviderProps> = ScrollPositionContext.Provider;

export const ScrollPositionProvider: React.FC<Props> = ({children}) => {
    const [nodePositions, setNodePositions] = useState<Positions>({});
    const getNodePos = useCallback((nodeName: PositionsKey) => nodePositions[nodeName], [
        nodePositions,
    ]);

    function setNodePos(nodePos: Positions): void {
        setNodePositions({
            ...nodePositions,
            ...nodePos,
        });
    }

    const context = {
        getNodePos,
        setNodePos,
    };

    return <ContextProvider value={context}>{children}</ContextProvider>;
};
