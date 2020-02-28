export const RECEIVE_ALERT = "RECEIVE_ALERT";
export const CLEAR_ALERT = "CLEAR_ALERT";

export const receiveAlert = options => ({
    type: RECEIVE_ALERT,
    payload: options
});
export const clearAlert = () => ({
    type: CLEAR_ALERT
});
