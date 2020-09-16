import React, { Component } from "react";
import {
  Page,
  Navbar,
  List,
  ListInput,
  ListItem,
  Block,
  BlockTitle,
  Button,
  Toggle,
} from "framework7-react";
import connect from "react-redux/es/connect/connect";
import { handleLogin } from "../../actions/UserActions";
import { handleShop } from "../../actions/DataActions";

import { setData } from "../../axios/setData";
import { getData } from "../../axios/getData";

class EditStorePage extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      address: "",
      phone: "",
      comment: "",
      area: "",
      section: "",
      store_id: 0,
      categories: [],
      carBrands: []
    };
  }

  handleData = (name, value) => {
    this.setState({ [name]: value });
  };

  categoryHandler = event => {
    this.setState({
      categories: [...event.target.options]
        .filter(o => o.selected)
        .map(o => o.value)
    });
  };

  carBrandsHandler = event => {
    this.setState({
      carBrands: [...event.target.options]
        .filter(o => o.selected)
        .map(o => o.value)
    });
  };
  carBrandsAllHandler = () => {
    const { carbrands } = this.props;
    this.setState({
      carBrands: carbrands.length === this.state.carBrands.length ? [] : carbrands.map(o => o.id)
    });
  };

  addStore = async () => {
    if (this.state.name === "") {
      this.$f7.toast
        .create({ text: "Введите название", closeTimeout: 2000 })
        .open();
      return;
    }

    this.$f7.dialog.preloader("Пожалуйста подождите...");
    const payload = { ...this.state };
    delete payload.store_id;
    const set_data = new setData();
    await set_data.data(`shop-add`, payload).then(() => {
      this.$f7.dialog.close();
    });
  };
  updateStore = async () => {
    if (this.state.name === "") {
      this.$f7.toast
        .create({ text: "Введите название", closeTimeout: 2000 })
        .open();
      return;
    }

    this.$f7.dialog.preloader("Пожалуйста подождите...");
    const payload = { ...this.state };
    delete payload.store_id;
    const set_data = new setData();
    await set_data
      .dataPut(`shop-update/${this.state.store_id}`, payload)
      .then(() => {
        let get_data = new getData();
        get_data
          .data("shop/" + this.state.store_id)
          .then(
            value => value !== undefined && this.props.handleShop(value[0])
          );
        this.$f7.dialog.close();
      });
  };

  async componentDidMount() {
    const { shop_id } = this.props.user;
    const {
      name,
      description,
      address,
      phone,
      comment,
      area,
      section,
      categories,
      car_brands
    } = this.props.shop;
    const store_id = Number(shop_id) || 0;
    this.setState({
      store_id,
      name,
      description,
      address,
      phone,
      comment,
      area: area || "",
      section: section || "",
      categories: categories.map(v => v.id),
      carBrands: car_brands.map(v => v.pivot.car_brand_id)
    });
  }

  render() {
    const {
      name,
      description,
      // address,
      phone,
      // comment,
      area,
      section
    } = this.state;
    const { carbrands, categories } = this.props;
    return (
      <Page>
        <Navbar
          color="white"
          textColor="white"
          bgColor="main"
          title={"Редактировать магазин"}
          backLink="Back"
        />
        <BlockTitle style={{ whiteSpace: "initial" }}>
          {"Здесь вы можете отредактировать параметры своего профиля."}
        </BlockTitle>
        <List>
          <ListItem title="Категория" smartSelect>
            <select
              name="shop_categories"
              multiple
              value={this.state.categories}
              onChange={this.categoryHandler}
            >
              {categories.map(cat => {
                return (
                  <option key={"cat-" + cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                );
              })}
            </select>
          </ListItem>
          <ListItem
            title="Марки автомобилей"
            smartSelect
            smartSelectParams={{
              openIn: "popup",
              searchbar: true,
              searchbarPlaceholder: "Поиск марки"
            }}
          >
            <select
              name="car"
              multiple
              value={this.state.carBrands}
              onChange={this.carBrandsHandler}
            >
              {carbrands.map(car => {
                return (
                  <option key={"cb-" + car.id} value={car.id}>
                    {car.car_brand}
                  </option>
                );
              })}
            </select>
          </ListItem>
          <li>
            <ul>
              <ListItem title="Все марки">
                <Toggle
                  slot="after"
                  checked={carbrands.length === this.state.carBrands.length}
                  onChange={this.carBrandsAllHandler}
                />
              </ListItem>
            </ul>
          </li>
          <ListItem style={{height: 1}} divider />
          <ListInput
            label="Название магазина"
            floatingLabel
            type="text"
            placeholder="Запчасти для..."
            value={name}
            onChange={event => this.handleData("name", event.target.value)}
          />
          <ListInput
            label="Описание"
            floatingLabel
            type="text"
            placeholder="Описание вашего магазина"
            value={description}
            onChange={event =>
              this.handleData("description", event.target.value)
            }
          />
          {/*<ListInput
            label="Адрес"
            floatingLabel
            type="text"
            placeholder="Точка продаж"
            value={address}
            onChange={event => this.handleData("address", event.target.value)}
          />*/}
          <ListInput
            label="Телефон"
            floatingLabel
            type="text"
            placeholder="Контактные телефоны"
            value={phone}
            onChange={event => this.handleData("phone", event.target.value)}
          />
          {/*<ListInput
            label="Комментарий"
            floatingLabel
            type="text"
            placeholder="Дополнительный комментарий (для себя)"
            value={comment}
            onChange={event => this.handleData("comment", event.target.value)}
          />*/}
          <ListInput
            label="АЦ Маршал"
            type="select"
            value={area}
            placeholder="Выберите..."
            onChange={event => this.handleData("area", event.target.value)}
          >
            <option value="Север">Север</option>
            <option value="Юг">Юг</option>
          </ListInput>
          <ListInput
            label="Секция"
            floatingLabel
            type="text"
            placeholder="№ секции"
            value={section}
            onChange={event => this.handleData("section", event.target.value)}
          />
        </List>
        <Block>
          <Button fill onClick={() => this.updateStore()}>
            {"Сохранить"}
          </Button>
        </Block>
      </Page>
    );
  }
}

const mapStateToProps = store => {
  return {
    user: store.user,
    shop: store.stores.shop,
    carbrands: store.carbrands,
    carmodels: store.carmodels,
    categories: store.stores.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLogin: user => dispatch(handleLogin(user)),
    handleShop: shop => dispatch(handleShop(shop))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditStorePage);
