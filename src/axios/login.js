import {axios} from './init'


export class authorisation {

    login = async (...args) => {
        // const {login, password} = args;
        console.log(args);
        const url = '/login';

        const payload = {
            email: args[0],
            password: args[1],
            application: 'marshal'
        };
        try {
            return await axios.post(url, payload);
        } catch (error) {
            return error.response;
        }
    }
}