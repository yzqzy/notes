import React, { useEffect, useRef } from 'react';
import { mount } from 'marketing/MarketingApp';

export default function MarketingApp () {
  const ref = useRef();

  useEffect(() => {
    mount(ref.current);
  }, []);

  return (
    <div ref={ ref }></div>
  );
}
