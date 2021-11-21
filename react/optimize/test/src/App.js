import { lazy, Suspense } from 'react';

function App () {
  let LazyComponent = null;

  if (true) {
    LazyComponent = lazy(() => import(/* webpackChunkName: "home" */'./pages/Home'));
  } else {
    LazyComponent = lazy(() => import(/* webpackChunkName: "list" */'./pages/List'));
  }

  return (
    <div>
      <Suspense fallback={ <div>loading...</div> }>
        <LazyComponent />
      </Suspense>
    </div>
  )
}

export default App;
