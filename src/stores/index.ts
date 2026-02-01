"use client";

import { createStore } from "easy-peasy";
import { liffModel, type LiffModel } from "./liff-model";

export type StoreModel = {
  liff: LiffModel;
};

export const store = createStore<StoreModel>({
  liff: liffModel,
});
