export declare type DefaultStateType = Record<PropertyKey, unknown>;
export interface ComponentDescriptor<State = DefaultStateType> {
    id: symbol;
    componentId: symbol;
    state: State;
}
export declare class Component<State extends DefaultStateType = DefaultStateType> {
    private _defultState;
    id: symbol;
    constructor(defaultState?: () => State);
    create(state?: Partial<State>): ComponentDescriptor<State>;
}
export declare function defineComponent<State extends DefaultStateType = DefaultStateType>(defaultState?: () => State): Component<State>;
