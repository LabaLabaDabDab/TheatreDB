import Header from './components/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';

import EmployeePage from './pages/EmployeePage';
import CountryPage from "./pages/CountryPage";
import AuthorPage from "./pages/AuthorPage";
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
import ProducerPerformancePage from "./pages/ProducerPerformancePage";

import HeaderRequest from "./components/HeaderRequest";
import Request1Page from "./pages/Requests/Request1Page";

import AddAchievement from "./components/Achievement/AddAchievement";
import UpdateAchievement from "./components/Achievement/UpdateAchievement";

import UpdateActor from "./components/Actor/UpdateActor";
import AddActor from "./components/Actor/AddActor"

import UpdateCountry from "./components/Countries/UpdateCountry";
import AddCountry from "./components/Countries/AddCountry";

import UpdateGenre from "./components/Genre/UpdateGenre";
import AddGenre from "./components/Genre/AddGenre";

import UpdateGender from "./components/Gender/UpdateGender";
import AddGender from "./components/Gender/AddGender";

import AddActorPlayingRole from "./components/ActorPlayingRole/AddActorPlayingRole";
import UpdateActorPlayingRole from "./components/ActorPlayingRole/UpdateActorPlayingRole";

import UpdateActorTour from "./components/ActorTour/UpdateActorTour";
import AddActorTour from "./components/ActorTour/AddActorTour";

import AddAuthor from "./components/Author/AddAuthor";
import UpdateAuthor from './components/Author/UpdateAuthor';

import AddDateOfPlaying from "./components/DateOfPlaying/AddDateOfPlaying";
import UpdateDateOfPlaying from "./components/DateOfPlaying/UpdateDateOfPlaying";

import AddDateOfTour from "./components/DateOfTour/AddDateOfTour";
import UpdateDateOfTour from "./components/DateOfTour/UpdateDateOfTour";

import AddDateOfPerformance from "./components/DateOfPerformance/AddDateOfPerformance";
import UpdateDateOfPerformance from "./components/DateOfPerformance/UpdateDateOfPerformance";

import AddDirector from "./components/Director/AddDirector";
import UpdateDirector from "./components/Director/UpdateDirector";

import AddEmployeeType from "./components/EmployeeType/AddEmployeeType";
import UpdateEmployeeType from "./components/EmployeeType/UpdateEmployeeType";

import AddEmployee from "./components/Employee/AddEmployee";
import UpdateEmployee from "./components/Employee/UpdateEmployee";

import AddMusician from "./components/Musician/AddMusician";
import UpdateMusician from "./components/Musician/UpdateMusician";

import AddRole from "./components/Role/AddRole";
import UpdateRole from "./components/Role/UpdateRole";

import AddTickets from "./components/Tickets/AddTickets";
import UpdateTickets from "./components/Tickets/UpdateTickets";

import AddTicketNumber from "./components/TicketNumber/AddTicketNumber";

import AddProducer from "./components/Producer/AddProducer";
import UpdateProducer from "./components/Producer/UpdateProducer";

import AddPerformance from "./components/Performance/AddPerformance";
import UpdatePerformance from "./components/Performance/UpdatePerformance";
import AddProducerPerformance from "./components/ProducerPerformance/AddProducerPerformance";
import UpdateProducerPerformance from "./components/ProducerPerformance/UpdateProducerPerformance";
import Request23Page from "./pages/Requests/RequestPag23Page";
import Request4Page from "./pages/Requests/Request4Page";
import Request5Page from "./pages/Requests/Request5Page";
import Request6Page from "./pages/Requests/Request6Page";
import Request7Page from "./pages/Requests/Request7Page";


function App() {
    return (
        <div className="App">
            <Router>
                <Switch>
                    <Route path={"/"} exact>
                        <Header/>
                    </Route>

                    <Route path={"/actors"} exact>
                        <ActorPage/>
                    </Route>
                    <Route path="/actors/edit/:id" component={UpdateActor} />
                    <Route path="/actors/add" component={AddActor} />

                    <Route path={"/achievements"} exact>
                        <AchievementPage/>
                    </Route>
                    <Route path="/achievements/edit/:id" component={UpdateAchievement} />
                    <Route path="/achievements/add" component={AddAchievement} />

                    <Route path={"/actor_playing_role"} exact>
                        <ActorPlayingRolePage/>
                    </Route>
                    <Route path="/actor_playing_role/edit/:id" component={UpdateActorPlayingRole} />
                    <Route path="/actor_playing_role/add" component={AddActorPlayingRole} />

                    <Route path={"/actor_tour"} exact>
                        <ActorTourPage/>
                    </Route>
                    <Route path="/actor_tour/edit/:id" component={UpdateActorTour} />
                    <Route path="/actor_tour/add" component={AddActorTour} />

                    <Route path={"/countries"} exact>
                        <CountryPage/>
                    </Route>
                    <Route path="/countries/edit/:id" component={UpdateCountry} />
                    <Route path="/countries/add" component={AddCountry} />

                    <Route path={"/authors"} exact>
                        <AuthorPage/>
                    </Route>
                    <Route path="/authors/add" component={AddAuthor} />
                    <Route path={"/authors/edit/:id"} component={UpdateAuthor} />

                    <Route path={"/date_of_playing"} exact>
                        <DateOfPlayingPage/>
                    </Route>
                    <Route path="/date_of_playing/add" component={AddDateOfPlaying} />
                    <Route path={"/date_of_playing/edit/:id"} component={UpdateDateOfPlaying} />

                    <Route path={"/date_of_tour"} exact>
                        <DateOfTourPage/>
                    </Route>
                    <Route path="/date_of_tour/add" component={AddDateOfTour} />
                    <Route path="/date_of_tour/edit/:id" component={UpdateDateOfTour} />

                    <Route path={"/date_of_performance"} exact>
                        <DateOfPerformancePage/>
                    </Route>
                    <Route path="/date_of_performance/add" component={AddDateOfPerformance} />
                    <Route path="/date_of_performance/edit/:id" component={UpdateDateOfPerformance} />

                    <Route path={"/directors"} exact>
                        <DirectorPage/>
                    </Route>
                    <Route path="/directors/add" component={AddDirector} />
                    <Route path="/directors/edit/:id" component={UpdateDirector} />

                    <Route path={"/employees"} exact>
                        <EmployeePage/>
                    </Route>
                    <Route path="/employees/add" component={AddEmployee} />
                    <Route path="/employees/edit/:id" component={UpdateEmployee} />

                    <Route path={"/employees_type"} exact>
                        <EmployeeTypePage/>
                    </Route>
                    <Route path="/employees_type/add" component={AddEmployeeType} />
                    <Route path="/employees_type/edit/:id" component={UpdateEmployeeType} />

                    <Route path={"/genders"} exact>
                        <GenderPage/>
                    </Route>
                    <Route path="/genders/edit/:id" component={UpdateGender} />
                    <Route path="/genders/add" component={AddGender} />

                    <Route path={"/genres"} exact>
                        <GenrePage/>
                    </Route>
                    <Route path="/genres/edit/:id" component={UpdateGenre} />
                    <Route path="/genres/add" component={AddGenre} />

                    <Route path={"/musicians"} exact>
                        <MusicianPage/>
                    </Route>
                    <Route path="/musicians/edit/:id" component={UpdateMusician} />
                    <Route path="/musicians/add" component={AddMusician} />

                    <Route path={"/performances"} exact>
                        <PerformancePage/>
                    </Route>
                    <Route path="/performances/add" component={AddPerformance} />
                    <Route path="/performances/edit/:id" component={UpdatePerformance} />

                    <Route path={"/producers"} exact>
                        <ProducerPage/>
                    </Route>
                    <Route path="/producers/add" component={AddProducer} />
                    <Route path="/producers/edit/:id" component={UpdateProducer} />

                    <Route path={"/producers-performances"} exact>
                        <ProducerPerformancePage/>
                    </Route>
                    <Route path="/producers-performances/add" component={AddProducerPerformance} />
                    <Route path="/producers-performances/edit/:id" component={UpdateProducerPerformance}/>

                    <Route path={"/roles"} exact>
                        <RolePage/>
                    </Route>
                    <Route path="/roles/add" component={AddRole} />
                    <Route path="/roles/edit/:id" component={UpdateRole} />

                    <Route path={"/tickets"} exact>
                        <TicketsPage/>
                    </Route>
                    <Route path="/tickets/add" component={AddTickets} />
                    <Route path="/tickets/edit/:id" component={UpdateTickets} />


                    <Route path={"/ticket_number"} exact>
                        <TicketNumberPage/>
                    </Route>
                    <Route path="/ticket_number/add" component={AddTicketNumber} />

                    <Route path="/request" exact>
                        <HeaderRequest />
                    </Route>

                    <Route path="/request1" exact>
                        <Request1Page />
                    </Route>

                    <Route path="/request23" exact>
                        <Request23Page />
                    </Route>

                    <Route path="/request4" exact>
                        <Request4Page />
                    </Route>

                    <Route path="/request5" exact>
                        <Request5Page />
                    </Route>

                    <Route path="/request6" exact>
                        <Request6Page />
                    </Route>

                    <Route path="/request7" exact>
                        <Request7Page />
                    </Route>

                </Switch>
            </Router>
        </div>
    );
}


export default App;

