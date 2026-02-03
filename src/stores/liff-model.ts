"use client";

import { action, type Action } from "easy-peasy";

export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export interface LiffModel {
  profile: LiffProfile | null;
  profileError: string | null;
  setProfile: Action<LiffModel, LiffProfile | null>;
  setProfileError: Action<LiffModel, string | null>;
}

export const liffModel: LiffModel = {
  profile: null,
  profileError: null,
  setProfile: action((state, payload) => {
    state.profile = payload;
  }),
  setProfileError: action((state, payload) => {
    state.profileError = payload;
  }),
};
