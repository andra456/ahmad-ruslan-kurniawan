import React, { Fragment } from 'react'
import MainRoutes from './main';
import {   BiDoorOpen } from 'react-icons/bi';

const Home = React.lazy(() => import('../pages/home'));
const Listrepos = React.lazy(() => import('../pages/repos'));
const Intro = React.lazy(() => import('../pages/intro'));


const set = {
  exact: true,
  sensitive: true,
  strict: true,
};


export const routeList = [
  {
    ...set,
    key: "dashboard",
    text: 'Organitation',
    icon : <BiDoorOpen/>,
    menu: true,
    path: "/explore",
    layout: "sidebar",
    children: <Home />,
    private: true

  },
  {
    ...set,
    key: "intro",
    text: 'intro',
    menu: false,
    path: "/",
    layout: "blank",
    children: <Intro />,
    private: false
  },
  {
    ...set,
    key: "repos_detail",
    text: 'Repost',
    icon : null,
    menu: false,
    path: "/repos/:Id",
    layout: "sidebar",
    children: <Listrepos />,
    private: true

  }

]


const Routes = () => (
  <Fragment>
    <MainRoutes options={routeList} />

  </Fragment>
);

export default Routes;
