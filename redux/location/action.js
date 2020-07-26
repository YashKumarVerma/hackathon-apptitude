import Types from "./types";

export const pushLocation = (payload) => ({
  type: Types.PUSH_LOCATION,
  payload: payload,
});

export const currentLocation = (payload) => ({
  type: Types.CURRENT_LOCATION,
  payload: payload,
});
