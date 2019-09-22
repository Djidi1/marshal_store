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
    Segmented,
    Icon,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";
import {setData} from "../../axios/setData";
import {convertIcon} from "../helpers/helpers"

class NewResponsePage extends Component {
    constructor() {
        super();
        this.state = {
            request_id: 0,
            status_id: 1,
            shop_id: 0,
            user_id: 0,
            price: '',
            in_stock: true,
            original: true,
            description: '',
            request: {created_at: new Date(), category: {}, answers_count: 0, status: ''},
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
            this.$f7.notification.create({
                icon: '<i class="icon marshal-icon"> </i>',
                title: 'Маршал Сервис',
                subtitle: 'Ответ добавлен',
                text: 'Спасибо за ваш ответ!',
                closeTimeout: 3000,
            }).open();
        });
        this.$f7.views.main.router.navigate('/');
    };

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
        const {price, description, in_stock, original, request} = this.state;

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
                        text={request.text || '-'}
                    >
                        <span slot="title">
                            {
                                request.category !== null &&
                                <Icon
                                    icon='sub-title'
                                    style={{background: convertIcon(request.category.icon)}}
                                />
                            }
                            [{request.status.status}]
                        </span>
                    </ListItem>
                </List>
                <div className={"block-with-header"}>
                    <BlockTitle
                        style={{whiteSpace: 'initial'}}
                    >Здесь вы можете ответить на заявку покупателя.</BlockTitle>
                    <Block>
                        <Segmented raised tag="p" className="width-100">
                            <Button outline
                                    onClick={() => this.handleData('original', false)}
                                    active={!original}
                                    color="blue"
                            >На заказ</Button>
                            <Button outline
                                    onClick={() => this.handleData('original', true)}
                                    active={original}
                                    color="blue"
                            >В наличии</Button>
                        </Segmented>
                        <Segmented raised tag="p" className="width-100">
                            <Button
                                outline
                                onClick={() => this.handleData('in_stock', false)}
                                active={!in_stock}
                            >Не оригинал</Button>
                            <Button
                                outline
                                onClick={() => this.handleData('in_stock', true)}
                                active={in_stock}
                            >Оригинал</Button>
                        </Segmented>
                    </Block>
                </div>
                <List className={"no-margin no-hairline"}>
                    <ListInput
                        outline
                        label="Цена"
                        type="number"
                        placeholder="Стоимость товара/услуги"
                        value={price}
                        onChange={(event) => this.handleData('price', event.target.value)}
                    />
                    <ListInput
                        outline
                        label="Описание"
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