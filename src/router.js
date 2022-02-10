import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import BottomMenu from "./components/BottomMenu";
import Loader from "./components/Loader";
import { getPrices } from "./actions/priceActions";

import { useDispatch, useSelector } from "react-redux";

const Navigation = lazy(() => import("./components/Navigation"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Wallet = lazy(() => import("./pages/Wallet"));
const Earn = lazy(() => import("./pages/Earn"));
const EarnToken = lazy(() => import("./pages/EarnToken"));
const EBCT = lazy(() => import("./pages/EBCT"));
const BuyCrypto = lazy(() => import("./pages/BuyCrypto"));
const Convert = lazy(() => import("./pages/Convert"));
const Transactions = lazy(() => import("./pages/Transactions"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Auth/Login"));
const TwoFactorAuth = lazy(() => import("./pages/Auth/Login/TwoFactorAuth"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const NotFound = lazy(() => import("./pages/NotFound"));

function RouterComponent() {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrices());
  }, []);

  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <div className="wrapper">
          <Navigation />
          <Routes>
            {isAuth ? (
              <>
                <Route
                  exact
                  path="/login"
                  element={<Navigate to="/dashboard" />}
                />
                <Route
                  exact
                  path="/login:2fa"
                  element={<Navigate to="/dashboard" />}
                />
                <Route
                  exact
                  path="/signup"
                  element={<Navigate to="/dashboard" />}
                />
                <Route exact path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/earn/:token" element={<EarnToken />} />
                <Route path="/ebct" element={<EBCT />} />
                <Route path="/convert" element={<Convert />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/buy" element={<BuyCrypto />} />
                <Route exact path="*" element={<Navigate to="/404" />} />
                <Route path="/404" element={<NotFound />} />
              </>
            ) : (
              <>
                <Route exact path="/" element={<Navigate to="/login" />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/login/:2fa" element={<TwoFactorAuth />} />
                <Route exact path="/signup" element={<Signup />} />
                <Route exact path="*" element={<Navigate to="/login" />} />
              </>
            )}
          </Routes>
        </div>
        <BottomMenu />
      </Suspense>
    </Router>
  );
}

export default RouterComponent;
