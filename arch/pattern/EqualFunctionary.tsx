import { useState, useEffect } from 'react'

export default () => {
  // 正常情况下这两个 hook 是完全够用的

  const [tabList, setTabList] = useState < Array<TabData>([])

  useEffect(() => {
    setTabList()
  })

  return (
    <>
      {tabList.map(x => (
        <p>{x.title}</p>
      ))}
    </>
  )
}
