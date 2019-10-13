import React from "react";
import {connect} from "react-redux";
import {getData} from "../../axios/getData";
import {handleRequest, handleRequests} from "../../actions/DataActions";
import {convertIcon} from "../helpers/helpers"
import StoreSelect from "../elements/StoreSelect"

import moment from "moment";

import {Detector} from "react-detect-offline";
import {get} from "idb-keyval";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Block,
    Page,
} from "framework7-react";

const getRequest = async (props, reqId) => {
    let detect = new Detector();
    if (await detect.state.online) {
        let get_data = new getData();
        await get_data
            .data("request/" + reqId)
            .then(value => value !== undefined && props.handleRequest(value));
    } else {
        await get("request/" + reqId).then(
            value => value !== undefined && props.handleRequest(value)
        );
    }
};

const getRequests = async (props, dateFrom, dateTo) => {
    dateFrom = moment(dateFrom).format("YYYY-MM-DD");
    dateTo = moment(dateTo).format("YYYY-MM-DD");
    let get_data = new getData();
    await get_data
        .data("requests", {params: {dateFrom, dateTo}})
        .then(value => value !== undefined && props.handleRequests(value));
};

class RequestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dateFrom: "",
            dateTo: "",
            category_id: 0,
            brand_id: 0,
        };
    }

    response_to_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate("/response_to_request/" + reqId + "/");
    }

    open_request(reqId) {
        this.$f7.dialog.preloader("Получаем предложения...");
        getRequest(this.props, reqId).then(() => {
            this.$f7.views.main.router.navigate("requests/" + reqId + "/");
            this.$f7.dialog.close();
        });
    }

    handleDateChange = date => {
        this.$f7.dialog.preloader("Получаем заявки...");
        this.setState({
            dateFrom: date[0],
            dateTo: date[1] || date[0]
        });
        getRequests(this.props, this.state.dateFrom, this.state.dateTo).then(() => {
            this.$f7.dialog.close();
        });
    };

    handleBrand = (brand_id) => {
        this.setState({ brand_id });
    };
    handleCategory = (category_id) => {
        this.setState({ category_id });
    };

    render() {
        const {requests, categories, carbrands} = this.props;
        const {category_id, brand_id} = this.state;
        const filtered_requests = requests.filter(x => {
            return (
                x.category_id === category_id
                || category_id === 0
                )
                &&
                (
                    (x.car !== null && x.car.car_brand_id === brand_id)
                    //|| x.car === null
                    || brand_id === 0
                )
        });
        return (
            <React.Fragment>
                {/*<BlockTitle style={{ whiteSpace: "initial" }}>*/}
                {/*Здесь отображаются заявки от покупателей на подбор автотоваров или*/}
                {/*запчастей.*/}
                {/*</BlockTitle>*/}


                <StoreSelect
                    carbrands={carbrands}
                    handleBrand={this.handleBrand}
                    categories={categories}
                    handleCategory={this.handleCategory}
                />
                {/*
                <List noHairlinesMd>
                    <ListInput
                        type="datepicker"
                        placeholder="Выберите диапазон"
                        id="date-range"
                        readonly
                        onCalendarChange={this.handleDateChange}
                        calendarParams={{dateFormat: "dd.mm.yyyy", rangePicker: true}}
                    />
                </List>
                */}
                <Page pageContent>
                    <List mediaList className={"no-margin"}>
                        {filtered_requests.length === 0 ? (
                            <Block>Нет открытых заявок в данной категории...</Block>
                        ) : (
                            filtered_requests.map(item => {
                                return (
                                    <ListItem
                                        key={item.id}
                                        swipeout
                                        onClick={() => this.open_request(item.id)}
                                        after={item.created_at.toLocaleString()}
                                        subtitle={`Ответов: ${item.answers_count}`}
                                    >
                                      <span slot="title">
                                          {
                                              item.category !== null &&
                                              <Icon
                                                  icon='sub-title'
                                                  style={{background: convertIcon(item.category.icon)}}
                                              />
                                          }

                                          [{item.status.status}]
                                      </span>
                                        <span slot="text">
                                            {
                                                item.car !== null &&
                                                <span className="car-brand">{item.car.car_brand.car_brand}: </span>
                                            }
                                            {item.text || '-'}
                                        </span>
                                        <SwipeoutActions left>
                                            <SwipeoutButton
                                                color="blue"
                                                onClick={() => this.response_to_request(item.id)}
                                            >
                                                <Icon material="reply"/> Ответить
                                            </SwipeoutButton>
                                        </SwipeoutActions>
                                    </ListItem>
                                );
                            })
                        )}
                    </List>
                </Page>
            </React.Fragment>
        );
    }
}

const mapStateToProps = store => {
    return {
        requests: store.requests,
        categories: store.stores.categories,
        carbrands: store.carbrands
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleRequest: request => dispatch(handleRequest(request)),
        handleRequests: requests => dispatch(handleRequests(requests))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RequestsPage);
