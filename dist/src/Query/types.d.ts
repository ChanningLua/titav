import { Component } from '../Component';
import { Modifier, OptionalSym } from './constants';
import { EntityId } from '../Entity';
declare type QueryComponents = Component | typeof EntityId | OptionalModifier;
export declare type QueryComponentsTuple = [QueryComponents, ...QueryComponents[]];
export declare type QueryModifier = {
    type: Modifier;
    components: Component[];
};
export declare type OptionalModifier<C = Component> = {
    type: typeof OptionalSym;
    value: C;
};
declare type GetDefaultState<T> = T extends Component<infer State> ? State : T extends typeof EntityId ? typeof EntityId : T extends OptionalModifier<infer C> ? GetDefaultState<C> | undefined : never;
export declare type MapQueryReturn<T extends unknown[]> = T extends [infer First, ...infer Rest] ? [GetDefaultState<First>, ...MapQueryReturn<Rest>] : [];
export {};
