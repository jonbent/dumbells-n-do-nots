export const OPEN_FILTERS_MODAL = "OPEN_FILTERS_MODAL";
export const CLOSE_FILTERS_MODAL = "CLOSE_FILTERS_MODAL";

export const closeFiltersModal = () => {
    return {
        type: CLOSE_FILTERS_MODAL,
    }
}

export const openFiltersModal = modal => ({
    type: OPEN_FILTERS_MODAL,
    modal
});