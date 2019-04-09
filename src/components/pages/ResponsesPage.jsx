import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    Page,
    Navbar,
    Subnavbar,
    List,
    Icon,
    ListItem,
    Block,
} from 'framework7-react';

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
        this.$f7.views.main.router.navigate('/requests/response/' + resp_id + '/');
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
                    <Subnavbar
                        inner={false}
                        className={"no-padding"}
                    >
                        <List
                            mediaList
                            className={"no-margin list-request"}
                        >
                            <ListItem
                                swipeout
                                after={request.created_at.toLocaleString()}
                                subtitle={"Предложений: " + (request.answers.length || 0) + ""}
                                text={request.text}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="access_time" color="blue"/>
                                    {this.get_category(request.category_id)}
                                </span>
                            </ListItem>
                        </List>
                    </Subnavbar>
                </Navbar>
                <List
                    mediaList
                    noHairlinesMd
                >
                    {/*
created_at: "2019-04-09 00:00:00"
description: "We have something "
id: 1
price: true
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
                            <Block>На ваш запрос пока нет ответов...</Block>
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
                                            item.price ? <Icon className={"status-icon"} material="fiber_new"
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

export default connect(mapStateToProps)(ResponsesPage)