import React from 'react';
import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
} from 'framework7-react';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            requests: [
                {
                    id: 1,
                    category: "Колодки",
                    text: "Необходимо подобрать тормозные колодки на автомобиль такой-то марки такого-то года выпуска.",
                    answers: "10",
                    status: "access_time",
                    date: new Date(),
                },
                {
                    id: 2,
                    category: "TO-3",
                    text: "Требуется комплект запчастей для прохождения ТО-3 на автомобиле таком-то такого-то года выпуска. Пробег 40 000 км.",
                    answers: "8",
                    status: "block",
                    date: new Date(),
                },
            ]
        };
    }

    edit_request(reqId) {
        const app = this.$f7;
        app.views.main.router.navigate('open_request/'+reqId+'/');
    }

    reply() {
        const app = this.$f7;
        app.dialog.alert('Reply');
    }

    render() {
        const {requests} = this.state;

        return (
            <div>
                <h1>Заявки</h1>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        requests.map( item => {
                            return <ListItem
                                key={item.id}
                                swipeout
                                link={"requests/" + item.id + "/"}
                                after={item.date.toLocaleString()}
                                subtitle={"Предложений: " + item.answers + ""}
                                text={item.text}
                            >
                                <span slot="title">
                                    <Icon className={"status-icon"} material={item.status} color="blue"/> {item.category}
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
            </div>
        );
    }
};
