import Header from './components/Header';
import {Route} from 'react-router-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import EmployeePage from './pages/EmployeePage';
import CountryPage from "./pages/CountryPage";
import AuthorPage from "./pages/AuthorPage";

import UpdateAuthor from './components/Author/UpdateAuthor';
import AchievementPage from "./pages/AchievementPage";
import ActorPlayingRolePage from "./pages/ActorPlayingRolePage";
import ActorPage from "./pages/ActorPage";
import ActorTourPage from "./pages/ActorTourPage";
import DateOfPlayingPage from "./pages/DateOfPlayingPage";
import DateOfTourPage from "./pages/DateOfTourPage";
import DateOfPerformancePage from "./pages/DateOfPerformancePage"

function App() {
  return (
      <div className="App">
          <Header/>
          <Route path={"/actors"}>
              <ActorPage/>
          </Route>

          <Route path={"/achievements"} exact>
              <AchievementPage/>
          </Route>

          <Route path={"/actor_playing_role"}>
              <ActorPlayingRolePage/>
          </Route>

          <Route path={"/actor_tour"}>
              <ActorTourPage/>
          </Route>

          <Route path={"/countries"} exact>
              <CountryPage/>
          </Route>

          <Route path={"/authors"} exact>
              <AuthorPage/>
          </Route>
          <Route path={"/authors/edit/:id"} compomnent ={UpdateAuthor} />

          <Route path={"/date_of_playing"} exact>
              <DateOfPlayingPage/>
          </Route>

          <Route path={"/date_of_tour"} exact>
              <DateOfTourPage/>
          </Route>

          <Route path={"/date_of_performance"} exact>
              <DateOfPerformancePage/>
          </Route>


      </div>
  );
}

export default App;

