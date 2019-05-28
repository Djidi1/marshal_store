import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
    ListItem,
    Toggle,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";

import {setData} from "../../axios/setData";

/*import {
    handleAddRequests,
    handleUpdateRequest,
   // handleDeleteRequest
} from "../../actions/DataActions";*/

/*
        'request_id',
        'status_id',
        'shop_id',
        'user_id',
        'price',
        'is_new',
        'description'
 */
class NewResponsePage extends Component {
    constructor() {
        super();
        this.state = {
            request_id: 0,
            status_id: 1,
            shop_id: 0,
            user_id: 0,
            price: '',
            is_new: true,
            description: '',
            request: {created_at: new Date(), answers_count: 0, status: ''},
        }
    }

    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    sendAnswer = () => {
        let req_data = {...this.state};
        delete req_data.request;
        const set_data = new setData();
        set_data.data('answer-add', req_data).then(data => {
            console.log(data.result);
            //this.props.handleAddRequests(data.result);
            this.addRequestSuccess.open();
        });
        this.$f7.views.main.router.navigate('/');
    };

    addRequestSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Заявка добавлена',
        text: 'В ближайшее время вам ответят.',
        closeTimeout: 3000,
    });

    get_category(cat_id) {
        const cat = this.props.categories.find(x => x.id === cat_id);
        return cat !== undefined ? cat.category : "Без категории"
    }

    componentDidMount() {
        const initData = {};
        const req_id = Number(this.$f7route.params.reqId);
        if (req_id > 0) {
            const request = this.props.requests.find(request => request.id === req_id);
            // Set data to local state
            initData.request_id = req_id;
            initData.shop_id = this.props.user.shop_id;
            initData.user_id = this.props.user.id;
            initData.request = request;
            this.setState(initData);
        }
    }

    render() {
        const {price, description, is_new, request} = this.state;

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={"Ответ на запрос"}
                    backLink="Back"
                >
                </Navbar>
                <List
                    mediaList
                    className={"no-margin list-title"}
                >
                    <ListItem
                        swipeout
                        after={request.created_at.toLocaleString()}
                        subtitle={`Ответов: ${request.answers_count || 0}`}
                        text={request.text}
                    >
                        <span slot="title">
                            {/*<Icon className={"status-icon"} material="access_time" color="blue"/>*/}
                            [{request.status.status}] {this.get_category(request.category_id)}
                        </span>
                    </ListItem>
                </List>
                <List
                    className={"list-with-header"}>
                    <ListItem>
                        <BlockTitle
                            style={{whiteSpace: 'initial'}}
                        >Здесь вы можете ответить на заявку покупателя.</BlockTitle>
                    </ListItem>
                    <ListItem>
                        <span>Товар новый</span>
                        <Toggle defaultChecked={is_new}
                                onChange={() => this.handleData('is_new', !is_new)}
                        />
                    </ListItem>
                    <ListInput
                        outline
                        label="Цена"
                        floatingLabel
                        type="text"
                        placeholder="Стоимость товара/услуги"
                        value={price}
                        onChange={(event) => this.handleData('price', event.target.value)}
                    />
                    <ListInput
                        outline
                        label="Описание"
                        floatingLabel
                        type="textarea"
                        placeholder="Дополнительная информация о товаре/предложении..."
                        value={description}
                        onChange={(event) => this.handleData('description', event.target.value)}
                    />


                </List>
                <Block>
                    <Button
                        fill
                        onClick={() => this.sendAnswer()}
                    >Отправить ответ</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
        cars: store.cars,
        models: store.carmodels,
        brands: store.carbrands,
        requests: store.requests,
        shops: store.stores.shops,
        categories: store.stores.categories,
    }
};
/*
const mapDispatchToProps = dispatch => {
    return {
        handleAddRequests: data => dispatch(handleAddRequests(data)),
        handleUpdateRequest: data => dispatch(handleUpdateRequest(data)),
    }
};
*/

export default connect(mapStateToProps/*, mapDispatchToProps*/)(NewResponsePage)