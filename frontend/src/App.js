import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import "./App.css";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import { AuthContext } from "./shared/context/auth-context";
import { useAuth } from "./shared/hooks/auth-hooks";
import LoadingSpinner from "./shared/components/UIElements/LoadingSpinner";

const Users = React.lazy(() => import("./user/page/Users"));
const NewPlace = React.lazy(() => import("./places/page/NewPlace"));
const UserPlaces = React.lazy(() => import("./places/page/UserPlaces"));
const UpdatePlace = React.lazy(() => import("./places/page/UpdatePlace"));
const Auth = React.lazy(() => import("./user/page/Auth"));

function App() {
  const { token, login, logout, userId } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
        >
          <Users />
        </Route>
        <Route
          path="/:userId/places"
          exact
        >
          <UserPlaces />
        </Route>
        <Route
          path="/places/new"
          exact
        >
          <NewPlace />
        </Route>
        <Route path="/places/:placeId">
          <UpdatePlace />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route
          path="/"
          exact
        >
          <Users />
        </Route>
        <Route
          path="/:userId/places"
          exact
        >
          <UserPlaces />
        </Route>
        <Route path="/auth">
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <MainNavigation />
        <main>
          <Suspense
            fallback={
              <div className="center">
                <LoadingSpinner />
              </div>
            }
          >
            {routes}
          </Suspense>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
