import React, {Component} from 'react';
import {connect} from "react-redux";

import {
    Page,
    Navbar,
    Subnavbar,
    List,
    Icon,
    ListItem,
} from 'framework7-react';


class ResponsesPage extends Component {

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    render() {
        const {reqId, requests} = this.props;
        const request = requests.find( x=> x.id === Number(reqId));

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
                                <span slot="sub-title">
                                    <b>Ford</b> Fiesta
                                </span>
                            </ListItem>
                        </List>
                    </Subnavbar>
                </Navbar>
                <List
                    mediaList
                    noHairlinesMd
                >
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="fiber_new" color="green"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="fiber_new" color="green"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title"><Icon className={"status-icon"} material="remove_circle" color="red"/> 500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title">500р</b>
                    </ListItem>
                    <ListItem
                        link="/requests/response/1/"
                        after="17:14 08.03.2018"
                        subtitle="1000 запчастей"
                        text="У нас есть то что вам нужно"
                    >
                        <b slot="title">500р</b>
                    </ListItem>

                </List>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        requests: store.requests,
        categories: store.stores.categories,
    }
};

export default connect(mapStateToProps)(ResponsesPage)