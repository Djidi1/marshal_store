import React from "react";
import { connect } from "react-redux";
import { List, BlockTitle, ListItem } from "framework7-react";
import { Detector } from "react-detect-offline";
import { getData } from "../../axios/getData";
import { handleResponse } from "../../actions/DataActions";
import { get } from "idb-keyval";
import _get from "lodash/get"
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
    const { requestsStore, shop_id } = this.props;
    const requests = [...requestsStore]
      .filter(req => req.answers.some(answer => answer.shop_id === shop_id));
    return (
      <React.Fragment>
        <BlockTitle>Здесь будут запросы на которые вы ответили.</BlockTitle>
        <List mediaList className={"list-title"}>
          {requests.length > 0
            ? requests.map(request => {
              const answer = _get(request, 'answers[0]', {});
              return (
                <ListItem
                  key={"answer-" + answer.id}
                  onClick={() => this.open_response(answer.id)}
                  swipeout
                  after={moment(answer.created_at).format("DD.MM.YYYY HH:mm")}
                >
                  <span slot="title">
                      <b>{answer.price} ₽</b>
                  </span>
                  <span slot="subtitle">
                    <b>{_get(request, 'user.name', '')}</b>: {request.text}
                  </span>
                  <div slot="text" className="width-100">
                    {(answer.in_stock ? "В наличии" : "На заказ") + " / " +
                    (answer.original ? "Оригинал" : "Не оригинал")}
                    {answer.reserve_date && <span className="car-brands">В резерве до {answer.reserve_date.toLocaleString().slice(0, 10)}</span>}
                    <div className="vin"><b>VIN:</b> {request.vin}</div>
                  </div>
                </ListItem>
              )
            })
            : ""}
        </List>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({requests, user}) => {
  return {
    requestsStore: requests,
    shop_id: user.shop_id
  };
}

const mapDispatchToProps = dispatch => {
  return {
    handleResponse: request => dispatch(handleResponse(request))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersPage);
