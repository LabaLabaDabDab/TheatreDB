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
import DirectorPage from "./pages/DirectorPage";
import EmployeeTypePage from "./pages/EmployeeTypePage";
import GenderPage from "./pages/GenderPage";
import GenrePage from "./pages/GenrePage";
import MusicianPage from "./pages/MusicianPage";
import PerformancePage from "./pages/PerformancePage"
import ProducerPage from  "./pages/ProducerPage"
import RolePage from "./pages/RolePage";
import TicketsPage from "./pages/TicketsPage";
import TicketNumberPage from "./pages/TicketNumberPage";

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

          <Route path={"/directors"} exact>
              <DirectorPage/>
          </Route>

          <Route path={"/employees"} exact>
              <EmployeePage/>
          </Route>

          <Route path={"/employees_type"} exact>
              <EmployeeTypePage/>
          </Route>

          <Route path={"/genders"} exact>
              <GenderPage/>
          </Route>

          <Route path={"/genres"} exact>
              <GenrePage/>
          </Route>

          <Route path={"/musicians"} exact>
              <MusicianPage/>
          </Route>

          <Route path={"/performances"} exact>
              <PerformancePage/>
          </Route>

          <Route path={"/producers"} exact>
              <ProducerPage/>
          </Route>

          <Route path={"/roles"} exact>
              <RolePage/>
          </Route>

          <Route path={"/tickets"} exact>
              <TicketsPage/>
          </Route>

          <Route path={"/ticket_number"} exact>
              <TicketNumberPage/>
          </Route>

      </div>
  );
}

export default App;

