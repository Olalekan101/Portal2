import { create } from "zustand";

export const useTablesState = create((set) => ({
  PaymentReqStateApprove: false,
  setPaymentReqStateApprove: () =>
    set((state) => ({ PaymentReqstate: !state.PaymentReqstate })),

  PaymentReqStateDecline: false,
  setPaymentReqStateDecline: () =>
    set((state) => ({ PaymentReqstate: !state.PaymentReqstate })),

  NarrationsStateApprove: false,
  setNarrationsStateApprove: () =>
    set((state) => ({ NarrationsState: !state.NarrationsState })),

  NarrationsStateDecline: false,
  setNarrationsStateDecline: () =>
    set((state) => ({ NarrationsState: !state.NarrationsState })),
}));
