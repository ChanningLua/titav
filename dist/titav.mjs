var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const mergeComponentState = (defaultState, state = {}) => {
  const def = Object.preventExtensions({ ...defaultState });
  for (const key of Object.keys(state)) {
    if (Object.prototype.hasOwnProperty.call(def, key)) {
      def[key] = state[key];
    }
  }
  return def;
};
function isObject(value) {
  return Object.prototype.toString.call(value).slice(8, -1) === "Object";
}
class Component {
  constructor(defaultState = () => ({})) {
    __publicField(this, "_defultState", {});
    __publicField(this, "id", Symbol("ComponentId"));
    const state = defaultState();
    if (isObject(state)) {
      this._defultState = Object.preventExtensions(state);
    }
  }
  create(state = {}) {
    return Object.preventExtensions({
      id: Symbol("ComponentDescriptorId"),
      componentId: this.id,
      state: mergeComponentState(this._defultState, state)
    });
  }
}
function defineComponent(defaultState = () => ({})) {
  return new Component(defaultState);
}
const EntityId = Symbol("EntityId");
class Entity {
  constructor() {
    __publicField(this, "components", []);
    __publicField(this, "id", Symbol("Entity"));
  }
  _findIndex(componentOrDesc) {
    if (componentOrDesc instanceof Component) {
      return this.components.findIndex((componentDesc) => componentOrDesc.id === componentDesc.componentId);
    }
    return this.components.findIndex((comp) => componentOrDesc.id === comp.id);
  }
  add(componentOrDesc) {
    const componentIndex = this.components.findIndex((c) => c.componentId === componentOrDesc.componentId);
    if (componentIndex >= 0) {
      this.components[componentIndex] = componentOrDesc;
    } else {
      this.components.push(componentOrDesc);
    }
    return this;
  }
  remove(componentOrDesc) {
    const index = this._findIndex(componentOrDesc);
    if (index >= 0) {
      this.components.splice(index, 1);
    }
    return this;
  }
  find(componentOrDesc) {
    const index = this._findIndex(componentOrDesc);
    if (index >= 0)
      return this.components[index];
    return void 0;
  }
  has(componentOrDesc) {
    return this._findIndex(componentOrDesc) >= 0;
  }
}
const createEntity = () => new Entity();
function typeOf(value, type) {
  return Object.prototype.toString.call(value).slice(8, -1) === type;
}
var Modifier;
(function(Modifier2) {
  Modifier2[Modifier2["With"] = 0] = "With";
  Modifier2[Modifier2["Without"] = 1] = "Without";
})(Modifier || (Modifier = {}));
const OptionalSym = Symbol("optional");
class Query {
  constructor(_components, ...modifiers) {
    __publicField(this, "_modifiers", []);
    __publicField(this, "_withComponents", new Set());
    __publicField(this, "_withoutComponents", new Set());
    this._components = _components;
    this._modifiers = modifiers.slice();
    modifiers.forEach((modifier) => {
      const modifierComponentSet = modifier.type === Modifier.With ? this._withComponents : this._withoutComponents;
      modifier.components.forEach((component) => {
        modifierComponentSet.add(component);
      });
    });
  }
  exec(world) {
    const matchingEntities = [];
    const queryComponents = this._components.filter((component) => component instanceof Component);
    for (const entity of world.entities) {
      if ([...this._withoutComponents].some((component) => entity.has(component)) || ![...this._withComponents].every((component) => entity.has(component)) || !queryComponents.every((component) => entity.has(component))) {
        continue;
      }
      matchingEntities.push(entity);
    }
    return matchingEntities.map((entity) => {
      return this._components.map((component) => {
        if (component === EntityId)
          return entity.id;
        if (component instanceof Component)
          return entity.find(component).state;
        if (typeOf(component, "Object") && component.type === OptionalSym) {
          return entity.find(component.value)?.state;
        }
        return void 0;
      });
    });
  }
}
function createQuery(components, ...modifiers) {
  return new Query(components, ...modifiers);
}
function With(...components) {
  return {
    type: Modifier.With,
    components
  };
}
function Without(...components) {
  return {
    type: Modifier.Without,
    components
  };
}
function Optional(component) {
  return {
    type: OptionalSym,
    value: component
  };
}
class World {
  constructor() {
    __publicField(this, "entities", new Set());
  }
  add(entity) {
    this.entities.add(entity);
    return this;
  }
  remove(entity) {
    if (entity instanceof Entity) {
      this.entities.delete(entity);
      return this;
    }
    for (const _entity of this.entities) {
      if (_entity.id === entity) {
        this.entities.delete(_entity);
        break;
      }
    }
    return this;
  }
  clear() {
    this.entities.clear();
    return this;
  }
  findEntity(eid) {
    return [...this.entities].find((entity) => entity.id === eid);
  }
}
const createWorld = () => new World();
export { Component, Entity, EntityId, Optional, Query, With, Without, World, createEntity, createQuery, createWorld, defineComponent };
