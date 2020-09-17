import React from "react";
import { connect } from "react-redux";
import { List, BlockTitle, ListItem } from "framework7-react";
import { Detector } from "react-detect-offline";
import { getData } from "../../axios/getData";
import { handleResponse } from "../../actions/DataActions";
import { get } from "idb-keyval";
import moment from "moment";

const getResponse = async (props, resp_id) => {
  let detect = new Detector();
  if (await detect.state.online) {
    let get_data = new getData();
    await get_data
      .data("answer/" + resp_id)
      .then(value => value !== undefined && props.handleResponse(value));
  } else {
    await get("answer/" + resp_id).then(
      value => value !== undefined && props.handleResponse(value)
    );
  }
};

class OrdersPage extends React.Component {
  open_response(resp_id) {
    this.$f7.dialog.preloader("Загружаем предложение...");
    getResponse(this.props, resp_id).then(() => {
      this.$f7.views.main.router.navigate(
        "/requests/response/" + resp_id + "/"
      );
      this.$f7.dialog.close();
    });
  }

  render() {
    const { orders } = this.props;
    return (
      <React.Fragment>
        <BlockTitle>Здесь будут запросы на которые вы ответили.</BlockTitle>
        <List mediaList className={"list-title"}>
          {orders.length > 0
            ? orders.map(order => (
                <ListItem
                  key={"order-" + order.id}
                  onClick={() => this.open_response(order.id)}
                  swipeout
                  after={moment(order.created_at).format("DD.MM.YYYY HH:mm")}
                  text={
                    (order.in_stock ? "В наличии" : "На заказ") + " / " +
                    (order.original ? "Оригинал" : "Не оригинал")
                  }
                >
                  <span slot="title">
                    <b>{order.price} ₽</b>
                  </span>
                  <span slot="subtitle">
                    <b>{order?.user?.name}</b>: {order.description}
                  </span>
                </ListItem>
              ))
            : ""}
        </List>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    orders: store.orders.orders
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleResponse: request => dispatch(handleResponse(request))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersPage);
