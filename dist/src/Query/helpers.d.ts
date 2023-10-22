import { Component } from '../Component';
import { OptionalModifier, QueryModifier } from './types';
export declare function With(...components: Component[]): QueryModifier;
export declare function Without(...components: Component[]): QueryModifier;
export declare function Optional<C extends Component>(component: C): OptionalModifier<C>;
