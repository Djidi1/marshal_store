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

    render() {
        const {reqId, requests, answers} = this.props;
        const request = requests.find(x => x.id === Number(reqId));

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
                                subtitle={"Предложений: " + (request.answers || 0) + ""}
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
                    {
                        answers.length === 0
                            ?
                            <Block>На ваш запрос пока нет ответов...</Block>
                            :
                            answers.map(item => {
                                return <ListItem
                                    key={item.id}
                                    link="/requests/response/1/"
                                    after="17:14 08.03.2018"
                                    subtitle="1000 запчастей"
                                    text="У нас есть то что вам нужно"
                                >
                                    <b slot="title"><Icon className={"status-icon"} material="fiber_new"
                                                          color="green"/> 500р</b>
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
        answers: store.answers,
        requests: store.requests,
        categories: store.stores.categories,
    }
};

export default connect(mapStateToProps)(ResponsesPage)