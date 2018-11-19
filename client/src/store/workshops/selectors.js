import { createSelector } from "reselect";
import { cleanOrder, cleanOffer } from "lib/clean_response";

const payload = state => state.workshops.current;

export const getUserByWorkshopId = createSelector(
  payload,
  payload => {
    if (!payload) return;
    const newPayload = JSON.parse(JSON.stringify(payload));
    if (newPayload.results.offers) {
      newPayload.results.offers = newPayload.results.offers.map(offer => {
        offer = cleanOffer(offer);
        offer.order = cleanOrder(offer.order);
        return offer;
      });
    }
    return newPayload;
  }
);
