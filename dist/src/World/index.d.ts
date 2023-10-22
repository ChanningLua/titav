import { Entity } from '../Entity';
export declare class World {
    entities: Set<Entity>;
    add(entity: Entity): this;
    remove(entity: Entity | symbol): this;
    clear(): this;
    findEntity(eid: symbol): Entity | undefined;
}
export declare const createWorld: () => World;
