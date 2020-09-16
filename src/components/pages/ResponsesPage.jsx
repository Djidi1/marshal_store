import React, {Component} from "react";
import {connect} from "react-redux";

import {Detector} from "react-detect-offline";
import {getData} from "../../axios/getData";
import {handleResponse} from "../../actions/DataActions";
import {get} from "idb-keyval";

import {
  Page,
  Navbar,
  List,
  Icon,
  ListItem,
  Block,
  Toolbar,
  Button
} from "framework7-react";
import {convertIcon} from "../helpers/helpers";

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

class ResponsesPage extends Component {

  get_shop(shop_id) {
    const shop = this.props.shops.find(x => x.id === shop_id);
    return shop !== undefined ? shop.name : "Без категории";
  }

  open_response(resp_id) {
    this.$f7.dialog.preloader("Загружаем предложение...");
    getResponse(this.props, resp_id).then(() => {
      this.$f7.views.main.router.navigate(
        "/requests/response/" + resp_id + "/"
      );
      this.$f7.dialog.close();
    });
  }

  newResponse() {
    const reqId = this.props.request.id;
    const app = this.$f7;
    app.views.main.router.navigate(`/response_to_request/${reqId}/`);
  }

  render() {
    const {request} = this.props;
    return (
      <Page>
        <Navbar
          color="white"
          textColor="white"
          bgColor="main"
          title="Предложения"
          backLink="Back"
        />
        <Toolbar position={"bottom"}>
          <Button
            fill
            onClick={() => this.newResponse()}
            className={"btn-new-response"}
          >
            Ответить на заявку
          </Button>
        </Toolbar>
        <List mediaList className={"no-margin list-title"}>
          <ListItem
            swipeout
            after={request.created_at.toLocaleString()}
            subtitle={`Ответов: ${request.answers.length || 0}`}
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

        <List mediaList noHairlinesMd className={"list-with-header"}>
          {request.answers.length === 0 ? (
            <Block>На запрос пока нет ответов...</Block>
          ) : (
            request.answers.map(item => {
              return (
                <ListItem
                  key={item.id}
                  onClick={() => this.open_response(item.id)}
                  after={item.created_at.toLocaleString()}
                  subtitle={item.user.name}
                >
                  <b slot="title">
                    {item.is_new ? (
                      <Icon
                        className={"status-icon"}
                        material="fiber_new"
                        color="green"
                      />
                    ) : null}
                    {item.price} ₽
                  </b>
                  <div className="goods-description" slot="text">
                    {item.reserve_date
                      ? (
                        <span className="car-brands">
                          В резерве до {item.reserve_date.toLocaleString().slice(0, 10)}
                        </span>
                      )
                      : null}
                    {item.description}
                  </div>
                </ListItem>
              );
            })
          )}
        </List>
      </Page>
    );
  }
}

const mapStateToProps = store => {
  return {
    request: store.request[0],
    categories: store.stores.categories,
    shop: store.stores.shop
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
)(ResponsesPage);
