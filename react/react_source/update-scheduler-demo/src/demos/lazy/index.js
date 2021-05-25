import React, {
  Suspense,
  unstable_ConcurrentMode as ConcurrentMode,
} from 'react'

// suspend demo
// import Comp from './suspend'

// suspend sync demo
// import Comp from './suspend-sync'

// lazy demo
import Comp from './lazy'

export default () => (
  <ConcurrentMode>
    <Suspense fallback="waitting" maxDuration={2000}>
      <Comp />
    </Suspense>
  </ConcurrentMode>
)
