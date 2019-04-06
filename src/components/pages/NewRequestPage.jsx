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


class NewRequestPage extends Component {
    constructor() {
        super();
        this.state = {
            selected_shops: []
        }
    }

    handleShops = (shops) => {
        this.setState({selected_shops: shops});
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

    render() {
        const { selected_shops } = this.state;
        const { shops } = this.props;
        const selectedShops = shops.filter( x => selected_shops.indexOf(x.id) !== -1);

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
                    <List noHairlinesMd>
                        <ListInput
                            outline
                            label="Заголовок"
                            floatingLabel
                            type="text"
                            placeholder="Колодки, маслоб свечи"
                            clearButton
                        />
                        <ListInput
                            outline
                            label="Описание"
                            floatingLabel
                            type="textarea"
                            placeholder="Дополнительная информация о требуемом товаре..."
                            clearButton
                        />

                        <BlockTitle>Запрос в магазин(ы):
                            <Button
                                small
                                fill
                                onClick={() => this.set_stores()}
                                style={{ float: 'right', display: 'inline-block'}}
                            >Выбрать</Button>
                        </BlockTitle>
                        <Block strong>
                            {
                                selectedShops.length > 0
                                    ?
                                    selectedShops.map((item, index) => {
                                        return <Chip key={index} text={item.name}/>
                                    })
                                    : "Запрос во все магазины"
                            }
                        </Block>
                </List>
                <Block>
                    <Button
                        fill
                    >Отправить заявку</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        requests: store.requests,
        shops: store.stores.shops,
    }
};

export default connect(mapStateToProps)(NewRequestPage)