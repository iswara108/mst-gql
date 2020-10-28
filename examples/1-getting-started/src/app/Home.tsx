import React, { useContext, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { values } from "mobx"
import { useQuery } from "./models/reactUtils"

import { Error, Loading, Todo } from "./components"
import { StoreContext } from "./models/reactUtils"

export const Home = observer(() => {
  const { loading, error, data, query } = useQuery((store) =>
    store.queryTodos()
  )

  const store = useContext(StoreContext)
  useEffect(() => store && console.log(store), [store])
  useEffect(() => {
    if (store?.todos)
      console.log("store", JSON.stringify(values(store.todos), null, 2))
    if (data?.todos) console.log("data", JSON.stringify(data.todos, null, 2))

    if (data?.todos && store?.todos)
      console.log(
        JSON.stringify(values(store.todos)) === JSON.stringify(data.todos)
      )
  })

  if (error) return <Error>{error.message}</Error>
  if (data)
    return (
      <>
        <ul>
          {values(store.todos).map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </ul>
        {loading ? (
          <Loading />
        ) : (
          <button onClick={query!.refetch}>Refetch</button>
          // <button onClick={() => store.queryTodos()}>Refetch</button>
        )}
      </>
    )
  return <Loading />
})
