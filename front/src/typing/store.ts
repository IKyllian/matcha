import { StoreType } from "front/store/store";

export type StoreSetType = { (partial: StoreType | Partial<StoreType> | ((state: StoreType) => StoreType | Partial<StoreType>), replace?: false): void; (state: StoreType | ((state: StoreType) => StoreType), replace: true): void; (arg0: { (state: any): any; (state: any): any; }): void; }