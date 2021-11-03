import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default function MarketingApp () {
  const ref = useRef();
  const history = useHistory();

  useEffect(() => {
    const { onParentNavgate } = mount(ref.current, {
      initialPath: history.location.pathname,
      onNavgate ({ pathname: nextPathname }) {
        const pathname = history.location.pathname;

        if (nextPathname !== pathname) {
          history.push(nextPathname);
        }
      }
    });

    onParentNavgate && history.listen(onParentNavgate);
  }, []);

  return (
    <div ref={ ref }></div>
  );
}
