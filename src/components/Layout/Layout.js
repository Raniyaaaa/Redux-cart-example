import { Fragment } from 'react';
import MainHeader from './MainHeader';

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader message={props.message}/>
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
