'use client'

import { useReducer, useContext, createContext, ReactNode, ActionDispatch, AnyActionArg } from 'react';
import { state, stateType } from './reducer';

type ContextType = {
    state: stateType;
    dispatch: ActionDispatch<AnyActionArg>;
};

const StateContext = createContext<ContextType>({
    state: state,
    dispatch: () => null
});

export const StateProvider = (props: { children: ReactNode, state: any, reducer: any }) => {
    const [state, dispatch] = useReducer(props.reducer, props.state);

    return (
        <StateContext value={{ state, dispatch }}>
            {props.children}
        </StateContext>
    );
};

export const useStateProvider = () => useContext(StateContext)