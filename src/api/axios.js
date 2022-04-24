import axios from 'axios';

export const auth = axios.create({
    baseURL: 'http://localhost:5000/auth',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
    
    
});

export const info = axios.create({
    baseURL: 'http://localhost:5001/user',
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' }
    
}); 