import {axios} from './init'


export class setData {
    data = async (type, payload) => {
        const url = '/' + type;
        try {
            let res = await axios.post(url, payload);
            if (res.status === 200) {
                return res.data;
            }
            return undefined;
        } catch (error) {
            console.log(error.response);
            return undefined;
        }
    };
}