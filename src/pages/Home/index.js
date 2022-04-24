import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import useInfo from "../../hooks/useInfo";
import useAuth from "../../hooks/useAuth";
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { DefaultPage } from '../DefaultPage';
import { InwardDashboard } from '../Inward/Dashboard';
import { TallyReport } from "../Inward/TallyReport";

export const Home = () => {

  const [profile,setProfile] = useState();
  const {auth} = useAuth();
  const info = useInfo();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() =>{
    let isMounted = true;
    const controller = new AbortController();

    const getProfile = async () =>{
      try{
        const response = await info.get('/data', {signal: controller.signal});
        isMounted && setProfile(response?.data);
      }
      catch(err){
        console.error(err);
        navigate('/login',{ state : { from : location } , replace : true});
      }
    }
    const interval = setInterval(() => {
        getProfile();
    },5000);

  return () => {
    clearInterval(interval);
    isMounted = false;
    controller.abort();
  }
  }, [info,navigate,location]);

  return (
    <>
      <Layout>
        <Routes>
            {/* DASHBOARD */}
            <Route path='/' element={<DefaultPage />}/>
            {/* INWARD */}
            <Route path='/inward/dashboard' element={<InwardDashboard />}/>
            <Route path='/inward/tallyreport' element={<TallyReport />}/>
            {/* OUTWARD */}
            <Route path='/outward/dashboard' element={<DefaultPage />}/>
            <Route path='/outward/presentation' element={<DefaultPage />}/>
            <Route path='/outward/scanning' element={<DefaultPage />}/>
            {/* CPPS */}
            <Route path='/cpps' element={<DefaultPage />}/>
        </Routes>
      </Layout>
      
    </>
  )
}