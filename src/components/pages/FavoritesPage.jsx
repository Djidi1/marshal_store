import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';
import {connect} from "react-redux";
import {setData} from "../../axios/setData";
import {handleFavoriteShopDelete} from "../../actions/DataActions";

class FavoritesPage extends React.Component {

    removeFavorite = (shop_id) => {
        const set_data = new setData();
        if (shop_id > 0) {
            set_data.dataPut('favorite-shop-remove/'+shop_id, {}).then(async () => {
                this.props.handleFavoriteShopDelete(shop_id);
                this.addFSSuccess.open();
            });
        }
    };

    addFSSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Магазин удален из избранного',
        closeTimeout: 3000,
    });

    render() {
        const {favorite_shops} = this.props;
        return (
            <div>
                <h1>Избранное</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        (favorite_shops.length) ?
                        favorite_shops.map(item =>
                            <ListItem
                                key={item.id}
                                swipeout
                                after={item.phone}
                                subtitle={item.description}
                                text={item.address}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material="store" color="purple"/> {item.name}
                                </span>
                                <SwipeoutActions right>
                                    <SwipeoutButton color="orange" onClick={() => this.removeFavorite(item.id)}>
                                        <Icon material="favorite"/> Из избранного
                                    </SwipeoutButton>
                                </SwipeoutActions>
                            </ListItem>
                        ) : "Вы можете добавить любимые магазины в избранное."
                    }
                </List>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        favorite_shops: store.stores.favorite_shops,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleFavoriteShopDelete: data => dispatch(handleFavoriteShopDelete(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesPage)