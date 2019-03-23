import React from 'react';
import {
    List,
    ListItem,
    Icon,
} from 'framework7-react';

export default class extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Favorite');
    }

    render() {
        return (
            <div>
                <h1>Личный кабинет</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    <ListItem
                        button
                        link="login/"
                        subtitle="После регистрации станут доступны дополнительные возможности"
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="account_circle" color="main"/> Вход
                        </span>
                    </ListItem>
                    <ListItem
                        button
                        link="/cars/"
                        subtitle="Для быстрого поиска"
                    >
                        <span slot="title">
                            <Icon className={"status-icon"} material="directions_car" color="main"/> Ваши автомобили
                        </span>
                    </ListItem>
                </List>
            </div>
        );
    }
};
