import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    AccordionContent,
    BlockTitle,
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
                <BlockTitle>Выберите интересующую вас категорию автотоваров:</BlockTitle>
                <List accordionList>
                    {
                        categories.sort((a, b) => {
                            return a.category < b.category ? -1 : 1
                        })
                            .map((cat, index) =>
                            <ListItem
                                key={index}
                                accordionItem
                                title={cat.category}>
                                <AccordionContent>
                                    <List
                                        mediaList
                                        className={"no-margin"}
                                    >
                                        {
                                            stores.filter(x => x.categories.find(y => y.id === cat.id)).map(item =>
                                                <ListItem
                                                    key={item.id}
                                                    swipeout
                                                    after={item.phone}
                                                    subtitle={item.description}
                                                    text={item.address}
                                                >
                                                    <span slot="title">
                                                        <Icon className={"status-icon"} material="store"
                                                              color="green"/> {item.name}
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
                                </AccordionContent>
                            </ListItem>
                        )
                    }
                </List>
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
