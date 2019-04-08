import React from 'react';
import {connect} from "react-redux";
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Block,
    BlockTitle
} from 'framework7-react';

class RequestsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    edit_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/' + reqId + '/');
    }

    reply() {
        const app = this.$f7;
        app.dialog.alert('Reply');
    }

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    render() {
        const {requests} = this.props;
        return (
            <React.Fragment>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >Здесь вы можете подать заявку на подбор необходимого вам атотовара или запчасти.</BlockTitle>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        requests.length === 0
                            ?
                            <Block>Вы пока не создавали запросов... Настало время?</Block>
                            :
                            requests.map(item => {
                                return <ListItem
                                    key={item.id}
                                    swipeout
                                    link={"requests/" + item.id + "/"}
                                    after={item.created_at.toLocaleString()}
                                    subtitle={"Предложений: " + (item.answers || 0) + ""}
                                    text={item.text}
                                >
                                <span slot="title">
                                    <Icon
                                        className={"status-icon"}
                                        material={item.answers > 0 ? 'check_circle_outline' : 'access_time'}
                                        color="blue"
                                    />
                                    {this.get_category(item.category_id)}
                                </span>
                                    <SwipeoutActions left>
                                        <SwipeoutButton color="blue" onClick={() => this.edit_request(1)}>
                                            <Icon material="edit"/> Редактировать
                                        </SwipeoutButton>
                                    </SwipeoutActions>
                                    <SwipeoutActions right>
                                        <SwipeoutButton
                                            color="orange"
                                            onClick={this.reply.bind(this)}
                                            confirmText="Подтвердите отмену вашей заявки"
                                        >
                                            <Icon material="delete"/> Отменить заявку
                                        </SwipeoutButton>
                                    </SwipeoutActions>
                                </ListItem>
                            })
                    }
                </List>
            </React.Fragment>
        );
    }
}


const mapStateToProps = store => {
    return {
        requests: store.requests,
        categories: store.stores.categories,
    }
};

export default connect(mapStateToProps)(RequestsPage)