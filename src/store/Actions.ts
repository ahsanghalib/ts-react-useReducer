import { ActionsEnum, ProductType, ActionsType } from "./Types";

export function Create(data: { name: string; price: number }): ActionsType {
    return {
      type: ActionsEnum.Create,
      payload: data,
    };
  }
  
  export function Delete(id: number): ActionsType {
    return {
      type: ActionsEnum.Delete,
      payload: { id },
    };
  }
  
  export function Edit(data: ProductType): ActionsType {
    return {
      type: ActionsEnum.Edit,
      payload: data,
    };
  }