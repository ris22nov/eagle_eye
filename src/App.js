import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { Login } from './pages/Login';
import {PersistLogin} from './components/PersistLogin';
import {RequireAuth} from './components/RequireAuth';
import { Home } from './pages/Home';
import CustomThemeProvider from './theme/CustomThemeProvider';

const App = () => {
  return (
    <CustomThemeProvider>
        <Router>
          <Routes>
            <Route path='/login' element={<Login/>}/>
            <Route element={<PersistLogin/>}>
              <Route element={<RequireAuth/>}>
                <Route path='*' element={<Home/>}/>
              </Route>
            </Route>
          </Routes>
        </Router>
    </CustomThemeProvider>
  );
}

export default App;