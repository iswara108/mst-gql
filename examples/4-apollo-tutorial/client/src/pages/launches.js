import React, { Fragment } from "react"
import { observer } from "mobx-react"

import { LaunchTile, Header, Button, Loading } from "../components"
import { useQuery } from "../models/reactUtils"
import { selectFromLaunch } from "../models/LaunchModel"

export default observer(function Launches() {
  const LaunchTileFragment = selectFromLaunch()
    .isBooked.rocket((rocket) => rocket.name)
    .mission((mission) => mission.name.missionPatch)
  console.log(LaunchTileFragment.toString())
  const { query } = useQuery((store) =>
    store.queryLaunches(null, (launchConnection) =>
      launchConnection.cursor.hasMore.launches((launch) =>
        launch.isBooked
          .rocket((rocket) => rocket.name)
          .mission((mission) => mission.name.missionPatch)
      )
    )
  )

  return (
    <Fragment>
      <Header />
      {query.case({
        error: () => <p>ERROR</p>,
        loading: () => <Loading />,
        data: ({ launches: launchConnection }) => (
          <Fragment>
            {launchConnection.launches.map((launch) => (
              <LaunchTile key={launch.id} launch={launch} />
            ))}
            {launchConnection.isFetchingMore ? (
              <Loading />
            ) : launchConnection.hasMore ? (
              <Button
                onClick={() => {
                  launchConnection.fetchMore()
                }}
              >
                Load More
              </Button>
            ) : null}
          </Fragment>
        )
      })}
    </Fragment>
  )
})
