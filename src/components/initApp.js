import { get } from "idb-keyval";
import { Detector } from "react-detect-offline";
import { getData } from "../axios/getData";

// Load data from indexedDB to Store
export class initApplication {
  init = async props => {
    await get("user").then(
      value => value !== undefined && props.handleLogin(value)
    );
    // from internet
    let detect = new Detector();
    if (detect.state.online) {
      await this.getDataFromDB(props);
    } else {
      await this.getDataFromLS();
    }
  };
  getDataFromDB = async props => {
    let get_data = new getData();
    const userDetails = await get_data
      .data("details")
      .then(value => value.success || {});
    const shop = get_data
      .data("user-shop")
      .then(value => value !== undefined && props.handleShop(value));
    const categories = get_data
      .data("categories")
      .then(value => value !== undefined && props.handleCategories(value));
    const requests = get_data
      .data("requests")
      .then(value => value !== undefined && props.handleRequests(value));
    const carbrands = get_data
      .data("carbrands")
      .then(value => value !== undefined && props.handleCarBrands(value));
    const carmodels = get_data
      .data("carmodels")
      .then(value => value !== undefined && props.handleCarModels(value));
    const orders = get_data
      .data("answers", { params: { shop_id: userDetails.shop_id || 0 } })
      .then(value => value !== undefined && props.handleOrders(value));

    // wait all requests
    await Promise.all([
      shop,
      categories,
      requests,
      carbrands,
      carmodels,
      orders
    ]).then(function(values) {
      console.log(values);
    });
  };
  getDataFromLS = async props => {
    const shop = get("shop").then(
      value => value !== undefined && props.handleShop(value)
    );
    const categories = get("categories").then(
      value => value !== undefined && props.handleCategories(value)
    );
    const requests = get("requests").then(
      value => value !== undefined && props.handleRequests(value)
    );
    const carbrands = get("carbrands").then(
      value => value !== undefined && props.handleCarBrands(value)
    );
    const carmodels = get("carmodels").then(
      value => value !== undefined && props.handleCarModels(value)
    );
    const orders = get("orders").then(
      value => value !== undefined && props.handleOrders(value)
    );

    // wait all requests
    await Promise.all([
      shop,
      categories,
      requests,
      carbrands,
      carmodels,
      orders
    ]).then(function(values) {
      console.log(values);
    });
  };
}
