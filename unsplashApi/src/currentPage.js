import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { Route, Switch, Redirect } from 'react-router-dom'

import routes from './routes'
import './mainStyle.css'

const switchRoutes = (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout === "/") {
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
        <Redirect from="/" to="/main" />
    </Switch>
  );

const useStyles = makeStyles(theme => ({
    content: {
      flexGrow: 1,
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
   
  }));
  
function CurrentPage() {
    const classes = useStyles();
  
    return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <div>{switchRoutes}</div>
      </main>
    </div>
    );
  }

  export default CurrentPage