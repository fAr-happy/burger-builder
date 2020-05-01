import React, {Fragment} from "react";
import styles from "./SideDrawer.module.css";
import NavigationItems from "components/Navigation/NavigationItems/NavigationItems";
import Logo from "components/Logo/Logo";
import Backdrop from "components/UI/Backdrop/Backdrop";

const SideDrawer = props => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.show) {
    attachedStyles = [styles.SideDrawer, styles.Open];
  }
  return (
    <Fragment>
      <Backdrop hideHandler={props.hideSideDrawer} show={props.show}></Backdrop>
      <div className={attachedStyles.join(" ")}>
        <div className={styles.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems  isAuthenticated={props.isAuth}/>
        </nav>
      </div>
    </Fragment>
  );
};

export default SideDrawer;
