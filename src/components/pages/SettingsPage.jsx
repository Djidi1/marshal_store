import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    Icon,
} from 'framework7-react';

class SettingsPage extends React.Component {

    render() {
        const {user} = this.props;
        return (
            <div>
                <h1>Личный кабинет</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {(user.id > 0)
                        ?
                        <ListItem
                            subtitle={user.email}
                        >
                        <span slot="title">
                            <Icon className={"status-icon"} material="account_circle" color="main"/> {user.name}
                        </span>
                        </ListItem>
                        :
                        <ListItem
                            button
                            link="login/"
                            subtitle="После регистрации станут доступны дополнительные возможности"
                        >
                        <span slot="title">
                            <Icon className={"status-icon"} material="account_circle" color="main"/> Вход
                        </span>
                        </ListItem>
                    }
                </List>
            </div>
        );
    }
}

const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

export default connect(mapStateToProps)(SettingsPage)