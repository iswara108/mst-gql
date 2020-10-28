/* This is a mst-gql generated file, don't modify it manually */
/* eslint-disable */

import { types } from "mobx-state-tree"
import { MSTGQLRef, QueryBuilder } from "mst-gql"
import { ModelBase } from "./ModelBase"
import { LaunchModel } from "./LaunchModel"
import { LaunchModelSelector } from "./LaunchModel.base"


/**
 * TripUpdateResponseBase
 * auto generated base class for the model TripUpdateResponseModel.
 */
export const TripUpdateResponseModelBase = ModelBase
  .named('TripUpdateResponse')
  .props({
    __typename: types.optional(types.literal("TripUpdateResponse"), "TripUpdateResponse"),
    success: types.union(types.undefined, types.boolean),
    message: types.union(types.undefined, types.null, types.string),
    launches: types.union(types.undefined, types.null, types.array(types.union(types.null, MSTGQLRef(types.late(() => LaunchModel))))),
  })
  .views(self => ({
    get store() {
      return self.__getStore()
    }
  }))

export class TripUpdateResponseModelSelector extends QueryBuilder {
  get success() { return this.__attr(`success`) }
  get message() { return this.__attr(`message`) }
  launches(builder) { return this.__child(`launches`, LaunchModelSelector, builder) }
}
export function selectFromTripUpdateResponse() {
  return new TripUpdateResponseModelSelector()
}

export const tripUpdateResponseModelPrimitives = selectFromTripUpdateResponse().success.message
