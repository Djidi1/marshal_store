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
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";

import {setData} from "../../axios/setData";
import {handleAddCar} from "../../actions/DataActions";

class NewCarPage extends Component {
    constructor() {
        super();
        this.state = {
            car_brand_id: 1,
            car_model_id: null,
            car_id: 0,
            vin: null,
            years: [],
            year: 2019,
        }
    }

    handleBrand = (brand_id) => {
        // find and set first available model
        const models = this.props.models.filter(x => x.car_brand_id === Number(brand_id));
        this.setState({ car_brand_id: Number(brand_id) }, () => {
            this.modelSelectComponent.f7SmartSelect.setValue(models[0].id);
        });
    };
    handleModel = (model_id) => {
        this.setState({ car_model_id: Number(model_id) });
    };
    handleYear = (year) => {
        this.setState({ year: Number(year) });
    };


    handleData = (name, value) => {
        this.setState({[name]: value});
    };


    sendRequest = () => {
        let req_data = {...this.state};
        delete req_data.years;
        req_data["user_id"] = this.props.user.id;
        const set_data = new setData();
        set_data.data('car-add',req_data).then(data => {
           this.props.handleAddCar(data.result);
        });
        this.addCarSuccess.open();
        this.$f7.views.main.router.navigate('/cars/');
    };

    addCarSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Машина добавлена',
        text: 'Теперь вы можете использовать ее в запросах.',
        closeTimeout: 3000,
    });

    componentDidMount() {
        let years = [];
        for (let i = 2019; i > 1900; i--) {
            years.push(i)
        }
        this.setState({years: years}, () => {
            this.yearSelectComponent.f7SmartSelect.setValue(years[0]);
        });
    }

    render() {
        const {brands, models} = this.props;
        const {car_brand_id, years} = this.state;
        const self = this;

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={this.$f7route.params.reqId > 0 ? "Редактировать машину" : "Добавление машины"}
                    backLink="Back"
                >
                </Navbar>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >Здесь вы можете добавить ваш автомобиль(и) для более быстрого подбора услуг.</BlockTitle>
                <List>
                    <ListItem
                        title="Марка автомобиля"
                        smartSelect
                        smartSelectParams={{
                            openIn: 'popup',
                            searchbar: true,
                            searchbarPlaceholder: 'Найти марку',
                            closeOnSelect: true,
                            on: {
                                closed: function () {
                                    self.handleBrand(this.getValue())
                                }
                            }
                        }}
                    >
                        <select>
                            {brands.map(brand => (
                                <option
                                    key={'brand_' + brand.id}
                                    value={brand.id}
                                >{brand.car_brand}</option>
                            ))}
                        </select>
                    </ListItem>
                    <ListItem
                        title="Модель"
                        smartSelect
                        ref={(el) => {this.modelSelectComponent = el}}
                        smartSelectParams={{
                            openIn: 'popup',
                            searchbar: true,
                            searchbarPlaceholder: 'Найти модель',
                            closeOnSelect: true,
                            on: {
                                closed: function () {
                                    self.handleModel(this.getValue())
                                }
                            }
                        }}
                    >
                        <select>
                            {models.filter(x => x.car_brand_id === car_brand_id).map(model => (
                                <option
                                    key={'model_' + model.id}
                                    value={model.id}
                                >{model.car_model}</option>
                            ))}
                        </select>
                    </ListItem>
                    <ListItem
                        title="Год выпуска"
                        ref={(el) => {this.yearSelectComponent = el}}
                        smartSelect
                        smartSelectParams={{
                            openIn: 'sheet',
                            closeOnSelect: true,
                            on: {
                                closed: function () {
                                    self.handleYear(this.getValue())
                                }
                            }
                        }}
                    >
                        <select>
                            {years.map(year => (<option key={'year_' + year} value={year}>{year}</option>))}
                        </select>
                    </ListItem>
                    <ListInput
                        label="VIN"
                        floatingLabel
                        type="text"
                        placeholder="Введите VIN номер автомобиля"
                        onChange={(event) => this.handleData('vin', event.target.value)}
                    />
                </List>
                <Block>
                    <Button
                        fill
                        onClick={this.sendRequest}
                    >Добавить</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
        brands: store.carbrands,
        models: store.carmodels,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleAddCar: data => dispatch(handleAddCar(data)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewCarPage)