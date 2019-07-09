import React from "react";
import { connect } from "react-redux";
import { getData } from "../../axios/getData";
// import {setData} from "../../axios/setData";
import { handleRequest } from "../../actions/DataActions";

import moment from "moment";

import { Detector } from "react-detect-offline";
import { get } from "idb-keyval";
import {
  List,
  ListItem,
  SwipeoutActions,
  SwipeoutButton,
  Icon,
  Block,
  BlockTitle,
  ListInput
} from "framework7-react";

const getRequest = async (props, reqId) => {
  let detect = new Detector();
  if (await detect.state.online) {
    let get_data = new getData();
    await get_data
      .data("request/" + reqId)
      .then(value => value !== undefined && props.handleRequest(value));
  } else {
    await get("request/" + reqId).then(
      value => value !== undefined && props.handleRequest(value)
    );
  }
};

class RequestsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: moment()
    };
  }

  answer_to_request(reqId) {
    const app = this.$f7;
    app.views.main.router.navigate("answer_to_request/" + reqId + "/");
  }

  open_request(reqId) {
    this.$f7.dialog.preloader("Получаем предложения...");
    getRequest(this.props, reqId).then(() => {
      this.$f7.views.main.router.navigate("requests/" + reqId + "/");
      this.$f7.dialog.close();
    });
  }

  get_category(cat_id) {
    const cat = this.props.categories.find(x => x.id === cat_id);
    return cat !== undefined ? cat.category : "Без категории";
  }

  handleDateChange = date => {
    this.setState({
      dateFrom: date
    });
  };

  render() {
    const { requests } = this.props;
    return (
      <React.Fragment>
        <BlockTitle style={{ whiteSpace: "initial" }}>
          Здесь отображаются заявки от покупателей на подбор автотоваров или
          запчастей.
        </BlockTitle>

        <List noHairlinesMd>
          <ListInput
            type="datepicker"
            placeholder="Выберите диапазон"
            id="date-range"
            readonly
            calendarParams={{ dateFormat: "dd.mm.yyyy", rangePicker: true }}
          />
        </List>

        <List mediaList className={"no-margin"}>
          {requests.length === 0 ? (
            <Block>Нет открытых заявок...</Block>
          ) : (
            requests.map(item => {
              return (
                <ListItem
                  key={item.id}
                  swipeout
                  onClick={() => this.open_request(item.id)}
                  after={item.created_at.toLocaleString()}
                  text={item.text}
                  subtitle={`Ответов: ${item.answers_count}`}
                >
                  <span slot="title">
                    {/*<Icon
                                        className={"status-icon"}
                                        material={item.answers > 0 ? 'check_circle_outline' : 'access_time'}
                                        color="blue"
                                    />*/}
                    [{item.status.status}] {this.get_category(item.category_id)}
                  </span>
                  <SwipeoutActions left>
                    <SwipeoutButton
                      color="blue"
                      onClick={() => this.answer_to_request(item.id)}
                    >
                      <Icon material="reply" /> Ответить
                    </SwipeoutButton>
                  </SwipeoutActions>
                </ListItem>
              );
            })
          )}
        </List>
      </React.Fragment>
    );
  }
}

const mapStateToProps = store => {
  return {
    requests: store.requests,
    categories: store.stores.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequest: request => dispatch(handleRequest(request))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RequestsPage);
