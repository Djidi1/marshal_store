import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    ListItem,
    Block,
    BlockTitle,
    Button,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";
import {handleLogin} from "../../actions/UserActions";

import {setData} from "../../axios/setData";


class EditStorePage extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            description: '',
            address: '',
            phone: '',
            comment: '',
            store_id: 0,
        }
    }

    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    addStore = async () => {
        if (this.state.name === '') {
            this.$f7.toast.create({ text: 'Введите название',closeTimeout: 2000 }).open();
            return;
        }

        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const payload = {...this.state};
        delete payload.store_id;
        const set_data = new setData();
        await set_data.data(`shop-add`, payload).then(() => {
            this.$f7.dialog.close();
        });
    };
    updateStore = async () => {
        if (this.state.name === '') {
            this.$f7.toast.create({ text: 'Введите название',closeTimeout: 2000 }).open();
            return;
        }

        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const payload = {...this.state};
        delete payload.store_id;
        const set_data = new setData();
        await set_data.data(`shop-update/${this.state.store_id}`, payload).then(() => {
            this.$f7.dialog.close();
        });
    };

    async componentDidMount() {
        const {email, name } = this.props.user;
        const store_id = Number(this.$f7route.params.storeId);

        if (store_id !== 0) {
            this.$f7.dialog.preloader('Пожалуйста подождите...');
            this.setState({email, name, store_id});
            this.$f7.dialog.close();
        } else {
            this.setState({store_id});
        }
    }

    render() {
        const { name, description, address, phone, comment, store_id} = this.state;
        const { carbrands, carmodels, categories } = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={store_id === 0 ? "Новый магазин" : "Редактировать магазин"}
                    backLink="Back"
                >
                </Navbar>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >{store_id === 0
                    ? "После регистрации станут доступны дополнительные возможности."
                    : "Здесь вы можете отредактировать параметры своего профиля."}</BlockTitle>
                <List>
                    <ListItem
                        title="Категория"
                        smartSelect
                    >
                        <select name="fruits" multiple defaultValue="0">
                            <option value="0">Все</option>
                            {
                                categories.map( cat => {
                                    return <option value={cat.id}>{cat.category}</option>
                                })
                            }
                        </select>
                    </ListItem>

                    <ListItem
                        title="Автомобили"
                        smartSelect
                        virtualList
                        smartSelectParams={{openIn: 'popup', searchbar: true, searchbarPlaceholder: 'Поиск марки'}}
                    >
                        <select name="car" multiple defaultValue="0">
                            <option value="0">Все</option>
                            {
                                carbrands.map( brand => {
                                    return <optgroup label={brand.car_brand}>
                                            {
                                            carmodels
                                                .filter( x => x.car_brand_id === brand.id)
                                                .map( model => <option value={model.id}>{model.car_model}</option>)
                                            }
                                    </optgroup>
                                })
                            }
                        </select>
                    </ListItem>
                    <ListInput
                        label="Название магазина"
                        floatingLabel
                        type="text"
                        placeholder="Запчасти для..."
                        value={name}
                        onChange={(event) => this.handleData('name', event.target.value)}
                    />
                    <ListInput
                        label="Описание"
                        floatingLabel
                        type="text"
                        placeholder="Описание вашего магазина"
                        value={description}
                        onChange={(event) => this.handleData('description', event.target.value)}
                    />
                    <ListInput
                        label="Адрес"
                        floatingLabel
                        type="text"
                        placeholder="Точка продаж"
                        value={address}
                        onChange={(event) => this.handleData('address', event.target.value)}
                    />
                    <ListInput
                        label="Телефон"
                        floatingLabel
                        type="text"
                        placeholder="Контактные телефоны"
                        value={phone}
                        onChange={(event) => this.handleData('phone', event.target.value)}
                    />
                    <ListInput
                        label="Комментарий"
                        floatingLabel
                        type="text"
                        placeholder="Дополнительный комментарий (для себя)"
                        value={comment}
                        onChange={(event) => this.handleData('comment', event.target.value)}
                    />
                </List>
                <Block>
                    <Button
                        fill
                        onClick={() => store_id === 0 ? this.addStore() :  this.updateStore()}
                    >{store_id === 0 ? "Добавить" : "Изменить"}</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
        carbrands: store.carbrands,
        carmodels: store.carmodels,
        categories: store.stores.categories
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: user => dispatch(handleLogin(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditStorePage)