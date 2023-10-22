import { World } from '../World';
import type { QueryComponentsTuple, MapQueryReturn, QueryModifier } from './types';
export declare class Query<T extends QueryComponentsTuple> {
    private _components;
    private _modifiers;
    private _withComponents;
    private _withoutComponents;
    constructor(_components: T, ...modifiers: QueryModifier[]);
    exec(world: World): MapQueryReturn<T>[];
}
export declare function createQuery<T extends QueryComponentsTuple>(components: T, ...modifiers: QueryModifier[]): Query<T>;
