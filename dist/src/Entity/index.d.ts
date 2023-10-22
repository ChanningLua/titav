import { Component, ComponentDescriptor, DefaultStateType } from '../Component';
export declare const EntityId: unique symbol;
export declare class Entity {
    components: ComponentDescriptor[];
    id: symbol;
    private _findIndex;
    add(componentOrDesc: ComponentDescriptor): this;
    remove(componentOrDesc: Component | ComponentDescriptor): this;
    find<State extends DefaultStateType = DefaultStateType>(componentOrDesc: Component<State> | ComponentDescriptor<State>): ComponentDescriptor<State> | undefined;
    has(componentOrDesc: Component | ComponentDescriptor): boolean;
}
export declare const createEntity: () => Entity;
