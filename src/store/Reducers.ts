import produce from "immer";
import { InitialStateType, ActionsType, ActionsEnum } from "./Types";

export const initialState: InitialStateType = {
  products: [],
  counter: 0,
};

export const Reducers = (state = initialState, action: ActionsType) => {
  switch (action.type) {
    case ActionsEnum.Create:
      return produce(state, (draft) => {
        const calcId =
          draft.products.length === 0
            ? 1
            : draft.products[draft.products.length - 1].id + 1;
        draft.products = [
          ...draft.products,
          {
            ...action.payload,
            id: calcId,
          },
        ];
      });
    case ActionsEnum.Delete:
      return produce(state, (draft) => {
        draft.products = draft.products.filter(
          (d) => d.id !== action.payload.id
        );
      });
    case ActionsEnum.Edit:
      return produce(state, (draft) => {
        const index = draft.products.findIndex(
          (d) => d.id === action.payload.id
        );
        draft.products[index].name = action.payload.name;
        draft.products[index].price = action.payload.price;
      });
    case "INCREASE_COUNTER":
      return { ...state, counter: state.counter + 1 };
    case "DECREASE_COUNTER":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
