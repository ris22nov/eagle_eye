
import {Routes,Route} from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { DefaultPage } from '../DefaultPage';
import { Dashboard } from '../Dashboard';

export const Home = () => {
  return (
    <>
      <Layout>
        <Routes>
            {/* DASHBOARD */}
            <Route path='/' element={<Dashboard />}/>
            {/* INWARD */}
            <Route path='/inward/dashboard' element={<DefaultPage />}/>
            <Route path='/inward/tallyreport' element={<DefaultPage />}/>
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