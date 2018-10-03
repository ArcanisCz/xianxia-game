export {default as resource} from "./resource";
export {default as technique} from "./technique";
export {
    getTechniquePrice as getTechniquePriceFn,
    canPay as canPayFn,
    getResource as getResourceFn,
    getResourceMax as getResourceMaxFn,
    getResourcePerSecond as getResourcePerSecondFn,
    getTechnique as getTechniqueFn,
} from "./fn";
