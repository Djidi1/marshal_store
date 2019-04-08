import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
    Chip,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";

import {setData} from "../../axios/setData";
import {handleAddRequests} from "../../actions/DataActions";

class NewRequestPage extends Component {
    constructor() {
        super();
        this.state = {
            selected_shops: [],
            shop_id: null,
            category_id: null,
            car_id: null,
            vin: null,
            text: null,
        }
    }

    handleShops = (shops) => {
        this.setState({ selected_shops: shops, shop_id: shops[0] });
    };


    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    set_stores = () => {
        const app = this.$f7;
        app.views.main.router.navigate('/stores_list/', {
            props: {
                handleShops: this.handleShops,
                selected_shops: this.state.selected_shops
            }
        });
    };

    sendRequest = () => {
        let req_data = {...this.state};
        delete req_data.selected_shops;
        req_data["user_id"] = this.props.user.id;
        const set_data = new setData();
        set_data.data('request-add',req_data).then(data => {
            this.props.handleAddRequests(data.result);
        });
        this.addRequestSuccess.open();
        this.$f7.views.main.router.navigate('/');
    };

    addRequestSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Заявка добавлена',
        text: 'В ближайшее время вам ответят.',
        closeTimeout: 3000,
    });

    render() {
        const {selected_shops} = this.state;
        const {shops, categories} = this.props;
        const selectedShops = shops.filter(x => selected_shops.indexOf(x.id) !== -1);

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={this.$f7route.params.reqId > 0 ? "Редактировать заявку" : "Новая заявка"}
                    backLink="Back"
                >
                </Navbar>
                {/*
                даты формирования заявки,
                текста,
                марки и модели автомобиля,
                количества ответов магазинов
                */}
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >Здесь вы можете оставить заявку на подбор необходимой вам запчасти или услуги.</BlockTitle>
                <List>
                    <ListInput
                        label="Категория товара"
                        type="select"
                        placeholder="Выберите..."
                        onChange={(event) => this.handleData('category_id', event.target.value)}
                    >
                        <option key={0} value={null}>Выберите...</option>
                        {
                        categories.map((item) =>
                            <option key={item.id} value={item.id}>{item.category}</option>
                        )
                    }
                    </ListInput>
                    <ListInput
                        label="Автомобиль"
                        type="select"
                        placeholder="Выберите..."
                        onChange={(event) => this.handleData('car_id', event.target.value)}
                    >
                        <option key={0} value={null}>Выберите...</option>
                        <option value="1">Mercedes</option>
                        <option value="2">BMW</option>
                    </ListInput>
                    <ListInput
                        outline
                        label="VIN"
                        floatingLabel
                        type="text"
                        placeholder="Для более быстрого поиска запчасти введите VIN номер автомобиля"
                        onChange={(event) => this.handleData('vin', event.target.value)}
                    />
                    <ListInput
                        outline
                        label="Описание"
                        floatingLabel
                        type="textarea"
                        placeholder="Дополнительная информация о требуемом товаре..."
                        onChange={(event) => this.handleData('text', event.target.value)}
                    />

                    <BlockTitle>Запрос в магазин:
                        <Button
                            small
                            fill
                            onClick={() => this.set_stores()}
                            style={{float: 'right', display: 'inline-block'}}
                        >Выбрать</Button>
                    </BlockTitle>
                    {
                        selectedShops.length > 0 ?
                            (
                                <Block strong>
                                    {
                                        selectedShops.map((item, index) => {
                                            return <Chip key={index} text={item.name}/>
                                        })
                                    }
                                </Block>
                            )
                            : null
                    }
                </List>
                <Block>
                    <Button
                        fill
                        onClick={this.sendRequest}
                    >Отправить заявку</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
        requests: store.requests,
        shops: store.stores.shops,
        categories: store.stores.categories,
    }
};
//handleAddRequests
const mapDispatchToProps = dispatch => {
    return {
        handleAddRequests: data => dispatch(handleAddRequests(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewRequestPage)