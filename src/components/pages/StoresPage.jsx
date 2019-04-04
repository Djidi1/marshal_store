import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Toolbar,
    Link,
    Tabs,
    Tab
} from 'framework7-react';

class StoresPage extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Магазин добавлен в избранные', 'Избранное');
    }

    render() {
        const {stores, categories} = this.props;
        return (
            <React.Fragment>
                <Toolbar
                    tabbar
                    top
                    scrollable
                    style={{top: 0}}
                >
                    {
                        categories.map((item, index) =>
                            <Link
                                key={"tab-"+item.id}
                                tabLink={"#tab-"+item.id}
                                tabLinkActive={index === 0}
                            >{ item.category }</Link>
                        )
                    }
                </Toolbar>
                <Tabs
                    style={{
                        overflow: 'scroll',
                        height: 'calc(100vh - var(--f7-toolbar-height) - var(--f7-page-toolbar-bottom-offset) - var(--f7-page-toolbar-bottom-offset) )'
                    }}
                >
                    {
                        categories.map((cat, index) =>
                            <Tab
                                key={"tab-"+cat.id}
                                id={"tab-"+cat.id}
                                className="page-content"
                                tabActive={index === 0}
                                style={{padding: 0}}
                            >
                                <List
                                    mediaList
                                    className={"no-margin"}
                                >
                                    {
                                        stores.filter( x => x.categories.find(y => y.id === cat.id)).map(item =>
                                                <ListItem
                                                    key={item.id}
                                                    swipeout
                                                    after={item.phone}
                                                    subtitle={item.description}
                                                    text={item.address}
                                                >
                                                    <span slot="title">
                                                        <Icon className={"status-icon"} material="store" color="green"/> {item.name}
                                                    </span>
                                                    <SwipeoutActions left>
                                                        <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                                            <Icon material="favorite"/> В избранное
                                                        </SwipeoutButton>
                                                    </SwipeoutActions>
                                                </ListItem>
                                        )
                                    }
                                </List>
                            </Tab>
                        )
                    }
                </Tabs>
            </React.Fragment>
        );
    }
}

const mapStateToProps = store => {
    console.log(store);
    return {
        stores: store.stores.shops,
        categories: store.stores.categories,
    }
};

export default connect(mapStateToProps)(StoresPage)
