import { TripUpdateResponseModelBase } from "./TripUpdateResponseModel.base"


/* A graphql query fragment builders for TripUpdateResponseModel */
export { selectFromTripUpdateResponse, tripUpdateResponseModelPrimitives, TripUpdateResponseModelSelector } from "./TripUpdateResponseModel.base"

/**
 * TripUpdateResponseModel
 */
export const TripUpdateResponseModel = TripUpdateResponseModelBase
  .actions(self => ({
    // This is an auto-generated example action.
    log() {
      console.log(JSON.stringify(self))
    }
  }))
