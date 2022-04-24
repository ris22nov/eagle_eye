import { auth } from '../api/axios';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await auth.post('/refresh',{
            withCredentials:true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return{ 'profile':response.data.profile,'accessToken':response.data.accessToken}
        });
        return response.data.access_token;
    }
    return refresh
}

export default useRefreshToken