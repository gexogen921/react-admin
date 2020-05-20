import decodeJwt from 'jwt-decode';
import {apiUrl} from '../constants';

export default {
    // called when the user attempts to log in
    login: ({ email, password }) =>  {
        const request = new Request(`${apiUrl}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status !==200 ) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ token }) => {
                const decodedToken = decodeJwt(token);
                const role = decodedToken.user.role;
                if(role==='user'){
                    throw new Error('Invalid user role');
                }
                localStorage.setItem('token', token);
                localStorage.setItem('permissions', decodedToken.user.role);
            })
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => localStorage.getItem('token')
    ? Promise.resolve()
    : Promise.reject(),
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    }
};