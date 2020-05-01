export type ProductType = {
  id: number;
  name: string;
  price: number;
};

export type InitialStateType = {
  products: Array<ProductType>;
  counter: number;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? { type: Key }
    : { type: Key; payload: M[Key] };
};

export enum ActionsEnum {
  Create = "CREATE_PRODUCT",
  Delete = "DELETE_PRODUCT",
  Edit = "EDIT_PRODUCT",
  IncreaseCounter = "INCREASE_COUNTER",
  DecreaseCounter = "DECREASE_COUNTER",
}

type CounterPayload = {
  [ActionsEnum.IncreaseCounter]: undefined;
  [ActionsEnum.DecreaseCounter]: undefined;
};

type CounterActions = ActionMap<CounterPayload>[keyof ActionMap<
  CounterPayload
>];

type ProductPayload = {
  [ActionsEnum.Create]: { name: string; price: number };
  [ActionsEnum.Delete]: { id: number };
  [ActionsEnum.Edit]: ProductType;
};

export type ProductActions = ActionMap<ProductPayload>[keyof ActionMap<
  ProductPayload
>];

export type ActionsType = ProductActions | CounterActions;
