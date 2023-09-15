import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './routes/Login';
import EmployeeLanding from './routes/EmployeeLanding';
import RouteOutlet from './routes/RouteOutlet';
import ContractorLanding from './routes/ContractorLanding';
import ExternalOrder from './routes/ExternalOrder';
import ExternalOrdersList from './routes/ExternalOrder/ListOrders';
import InternalList from './routes/EmployeeLanding/InternalList';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<RouteOutlet/>}>
            <Route path="*" element={<Login/>}/>
            <Route exact path="/employee" element={<EmployeeLanding/>}/>
            <Route exact path="/contractor" element={<ContractorLanding/>} />
            <Route exact path="/employee/external-list" element={<ExternalOrdersList/>} />
            <Route exact path="/employee/internal-list" element={<InternalList/>} />
            <Route exact path="/employee/external/:product_id" element={<ExternalOrder/>} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
