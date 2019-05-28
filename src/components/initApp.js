import { get } from 'idb-keyval';
import { Detector } from "react-detect-offline";
import { getData } from '../axios/getData'

// Load data from indexedDB to Store
export class initApplication {
    init = async (props) => {
        await get('user').then(value => value !== undefined && props.handleLogin(value));

        // from internet
        let detect = new Detector();
        if (detect.state.online) {
            await this.getDataFromDB(props);
        } else {
            await this.getDataFromLS();
        }
    };
    getDataFromDB = async (props) => {
        let get_data = new getData();
        const shops = get_data.data('shops').then(value => value !== undefined && props.handleShops(value));
        const categories = get_data.data('categories').then(value => value !== undefined && props.handleCategories(value));
        const requests = get_data.data('requests').then(value => value !== undefined && props.handleRequests(value));
        const carbrands = get_data.data('carbrands').then(value => value !== undefined && props.handleCarBrands(value));
        const carmodels = get_data.data('carmodels').then(value => value !== undefined && props.handleCarModels(value));

        // wait all requests
        await Promise.all([shops, categories, requests, carbrands, carmodels]).then(function(values) {
            console.log(values);
        });
    };
    getDataFromLS = async (props) => {
        const shops = get('shops').then(value => value !== undefined && props.handleShops(value));
        const categories = get('categories').then(value => value !== undefined && props.handleCategories(value));
        const requests = get('requests').then(value => value !== undefined && props.handleRequests(value));
        const carbrands = get('carbrands').then(value => value !== undefined && props.handleCarBrands(value));
        const carmodels = get('carmodels').then(value => value !== undefined && props.handleCarModels(value));

        // wait all requests
        await Promise.all([shops, categories, requests, carbrands, carmodels]).then(function(values) {
            console.log(values);
        });
    }
}
