import React from 'react';
import {connect} from "react-redux";
import { Offline } from "react-detect-offline";
import { initApplication } from "../initApp"

import {
    Page,
    Navbar,
    NavRight,
    Link,
    Toolbar,
    Tabs,
    Tab,
} from 'framework7-react';

import { handleLogin } from "../../actions/UserActions";
import {
    handleCategories,
    handleShops,
    handleRequests,
    handleCarBrands,
    handleCarModels,
} from "../../actions/DataActions";

import RequestsPage from './RequestsPage';
import OrdersPage from './OrdersPage';
import SettingsPage from './SettingsPage';

class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            title: "Заявки",
            loaded: false,
        }
    }

    async componentDidMount() {
        if (!this.state.loaded) {
            this.$f7.dialog.preloader('Загрузка...');
            const initApp = new initApplication();
            await initApp.init(this.props);
            this.setState({loaded: true});
            this.$f7.dialog.close();
        }
    }

    chgTitle = (title) => {
        this.setState({title: title});
    };

    render() {
        const { title } = this.state;
        return (
            <Page hideToolbarOnScroll pageContent={false}>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={"МС" + (title !== '' ? (' / ' + title) : "")}
                >
                    <NavRight>
                        <Offline>
                            <Link iconMd="material:signal_wifi_off" />
                        </Offline>
                    </NavRight>
                </Navbar>
                <Toolbar
                    bottom
                    tabbar
                    labels
                    color="main"
                >
                    <Link tabLink="#requests" onClick={() => this.chgTitle('Заявки')} tabLinkActive text="Заявки" iconMd="material:important_devices"/>
                    <Link tabLink="#orders" onClick={() => this.chgTitle('Заказы')} text="Заказы" iconMd="material:list"/>
                    <Link tabLink="#person" onClick={() => this.chgTitle('Личный Кабинет')} text="Кабинет" iconMd="material:person"/>
                </Toolbar>

                <Tabs animated>
                    <Tab id="requests" className="page-content" tabActive>
                        <RequestsPage/>
                    </Tab>
                    <Tab id="orders" className="page-content">
                        <OrdersPage/>
                    </Tab>
                    <Tab id="person" className="page-content">
                        <SettingsPage/>
                    </Tab>
                </Tabs>
            </Page>
        )
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: user => dispatch(handleLogin(user)),
        handleShops: shops => dispatch(handleShops(shops)),
        handleCategories: categories => dispatch(handleCategories(categories)),
        handleRequests: requests => dispatch(handleRequests(requests)),
        handleCarBrands: brands => dispatch(handleCarBrands(brands)),
        handleCarModels: models => dispatch(handleCarModels(models)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)