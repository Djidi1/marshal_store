import React, {Component} from 'react';
import {connect} from "react-redux";

import {Detector} from "react-detect-offline";
import {getData} from "../../axios/getData";
import {handleResponse} from "../../actions/DataActions";
import {get} from "idb-keyval";

import {
    Page,
    Navbar,
    List,
    Icon,
    ListItem,
    Block,
    Toolbar,
    Button
} from 'framework7-react';

const getResponse = async (props, resp_id) => {
    let detect = new Detector();
    if (await detect.state.online) {
        let get_data = new getData();
        await get_data.data('answer/' + resp_id).then(value => value !== undefined && props.handleResponse(value));
    }else{
        await get('answer/' + resp_id).then(value => value !== undefined && props.handleResponse(value));
    }
};

class ResponsesPage extends Component {

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    get_shop(shop_id) {
        const shop = this.props.shops.find(x => x.id === shop_id);
        return shop !== undefined ? shop.name : "Без категории"
    }

    open_response(resp_id) {
        this.$f7.dialog.preloader('Загружаем предложение...');
        getResponse(this.props, resp_id).then(() => {
            this.$f7.views.main.router.navigate('/requests/response/' + resp_id + '/');
            this.$f7.dialog.close();
        });
    }

    newResponse() {
        const reqId = this.props.request.id;
        const app = this.$f7;
        app.views.main.router.navigate(`/response_to_request/${reqId}/`);
    }

    render() {
        const {request} = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Предложения"
                    backLink="Back"
                >
                </Navbar>
                <Toolbar
                    position={'bottom'}
                >
                    <Button
                        fill
                        onClick={()=>this.newResponse()}
                        className={"btn-new-response"}
                    >Ответить на заявку</Button>
                </Toolbar>
                <List
                    mediaList
                    className={"no-margin list-title"}
                >
                    <ListItem
                        swipeout
                        after={request.created_at.toLocaleString()}
                        subtitle={`Ответов: ${request.answers.length || 0}`}
                        text={request.text}
                    >
                        <span slot="title">
                            {/*<Icon className={"status-icon"} material="access_time" color="blue"/>*/}
                            [{request.status.status}] {this.get_category(request.category_id)}
                        </span>
                    </ListItem>
                </List>

                <List
                    mediaList
                    noHairlinesMd
                    className={"list-with-header"}
                >
                    {/*
created_at: "2019-04-09 00:00:00"
description: "We have something "
id: 1
is_new: true
price: 200
request_id: 1
shop_id: 7
status_id: 1
updated_at: "2019-04-09 00:00:00"
updated_by: 1
user_id: 1
*/}
                    {
                        request.answers.length === 0
                            ?
                            <Block>На запрос пока нет ответов...</Block>
                            :
                            request.answers.map(item => {
                                return <ListItem
                                    key={item.id}
                                    onClick={() => this.open_response(item.id)}
                                    after={item.created_at.toLocaleString()}
                                    subtitle={this.get_shop(item.shop_id)}
                                    text={item.description}
                                >
                                    <b slot="title">
                                        {
                                            item.is_new ? <Icon className={"status-icon"} material="fiber_new"
                                                  color="green"/> : null
                                        }
                                        {item.price}</b>
                                </ListItem>
                            })
                    }
                </List>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        request: store.request[0],
        categories: store.stores.categories,
        shops: store.stores.shops,
    }
};


const mapDispatchToProps = dispatch => {
    return {
        handleResponse: request => dispatch(handleResponse(request)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsesPage)