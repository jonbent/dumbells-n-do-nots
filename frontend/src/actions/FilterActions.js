export const RECEIVE_NEXT_STEP = "RECEIVE_NEXT_STEP";
export const RECEIVE_PAGE_SIZE = "RECEIVE_PAGE_SIZE";
export const RECEIVE_PAGE_NUM = "RECEIVE_PAGE_NUM";

export const receiveNextStep = num => ({
    type: RECEIVE_NEXT_STEP,
    num
})
export const receivePageSize = num => ({
    type: RECEIVE_PAGE_SIZE,
    num
})
export const receivePageNum = num => ({
    type: RECEIVE_PAGE_NUM,
    num
})