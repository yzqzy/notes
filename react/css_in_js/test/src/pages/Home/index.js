import React from 'react';
import { useHistory, useLocation, useRouteMatch, useParams } from 'react-router-dom';

export default function Home (props) {
  console.log(props);
  console.log(useHistory())
  console.log(useLocation())
  console.log(useRouteMatch())
  console.log(useParams())

  return <div>Home</div>;
}