import React, { useRef } from "react"
import { observer } from "mobx-react-lite"

import { MessageModelType } from "../models"

import { Loading, Error } from "./utils"
import { useQuery } from "../models/reactUtils"

export const Composer = observer(
  ({ replyTo }: { replyTo?: MessageModelType }) => {
    const [newText, setNewText] = React.useState("")
    const { store, loading, error, setQuery } = useQuery()
    return error ? (
      <Error>Failed to post message: ${error}</Error>
    ) : loading ? (
      <Loading />
    ) : (
      <div className="composer">
        <input value={newText} onChange={(e) => setNewText(e.target.value)} />
        <button
          onClick={async () => {
            const query = store.sendTweet(newText, replyTo && replyTo.id)
            setNewText("")
            setQuery(query)
            await query
            if (replyTo) replyTo.loadReplies()
          }}
        >
          Send
        </button>
      </div>
    )
  }
)
