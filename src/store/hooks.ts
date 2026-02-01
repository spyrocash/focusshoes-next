"use client";

import { createTypedHooks } from "easy-peasy";
import type { StoreModel } from "./index";

export const { useStoreActions, useStoreDispatch, useStoreState } =
  createTypedHooks<StoreModel>();
