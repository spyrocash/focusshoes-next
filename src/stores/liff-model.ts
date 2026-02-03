"use client";

import { action, thunk, type Action, type Thunk } from "easy-peasy";
import liff from "@line/liff";
import type { StoreModel } from "./index";

export type LiffProfile = {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
};

export interface LiffModel {
  ready: boolean;
  initializing: boolean;
  error: string | null;
  profile: LiffProfile | null;
  profileError: string | null;
  liffId: string | null;
  setReady: Action<LiffModel, boolean>;
  setInitializing: Action<LiffModel, boolean>;
  setError: Action<LiffModel, string | null>;
  setProfile: Action<LiffModel, LiffProfile | null>;
  setProfileError: Action<LiffModel, string | null>;
  setLiffId: Action<LiffModel, string | null>;
  initLiff: Thunk<
    LiffModel,
    { withLoginOnExternalBrowser?: boolean; liffId?: string } | void,
    unknown,
    StoreModel,
    Promise<boolean>
  >;
  fetchProfile: Thunk<LiffModel, void, unknown, StoreModel, Promise<boolean>>;
}

export const liffModel: LiffModel = {
  ready: false,
  initializing: false,
  error: null,
  profile: null,
  profileError: null,
  liffId: null,
  setReady: action((state, payload) => {
    state.ready = payload;
  }),
  setInitializing: action((state, payload) => {
    state.initializing = payload;
  }),
  setError: action((state, payload) => {
    state.error = payload;
  }),
  setProfile: action((state, payload) => {
    state.profile = payload;
  }),
  setProfileError: action((state, payload) => {
    state.profileError = payload;
  }),
  setLiffId: action((state, payload) => {
    state.liffId = payload;
  }),
  initLiff: thunk(async (actions, payload, { getState }) => {
    if (!liff.isInClient()) return true;

    if (process.env.NODE_ENV === "development") {
      actions.setError("โหมดพัฒนา: ปิดการเชื่อมต่อ LIFF");
      return false;
    }

    const resolvedLiffId =
      payload?.liffId ??
      process.env.NEXT_PUBLIC_HOME_LIFF_ID ??
      process.env.NEXT_PUBLIC_LIFF_ID;

    if (!resolvedLiffId) {
      actions.setError("ยังไม่ได้ตั้งค่า LIFF ID");
      return false;
    }

    if (getState().ready && getState().liffId === resolvedLiffId) return true;
    if (getState().initializing) return false;

    actions.setInitializing(true);
    actions.setError(null);

    try {
      const withLoginOnExternalBrowser = payload?.withLoginOnExternalBrowser ?? false;
      await liff.init({ liffId: resolvedLiffId, withLoginOnExternalBrowser });
      actions.setReady(true);
      actions.setLiffId(resolvedLiffId);
      if (liff.isLoggedIn()) {
        await actions.fetchProfile();
      }
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "ไม่สามารถเริ่มต้น LIFF ได้";
      actions.setError(message);
      return false;
    } finally {
      actions.setInitializing(false);
    }
  }),
  fetchProfile: thunk(async (actions) => {
    actions.setProfileError(null);
    if (!liff.isLoggedIn()) {
      actions.setProfile(null);
      return false;
    }

    try {
      const profile = await liff.getProfile();
      actions.setProfile({
        userId: profile.userId,
        displayName: profile.displayName,
        pictureUrl: profile.pictureUrl,
        statusMessage: profile.statusMessage,
      });
      return true;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "ไม่สามารถดึงโปรไฟล์ได้";
      actions.setProfileError(message);
      return false;
    }
  }),
};
