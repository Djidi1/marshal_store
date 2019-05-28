import React from 'react';
import {connect} from "react-redux";
import {
    BlockTitle,
} from 'framework7-react';

class OrdersPage extends React.Component {


    render() {
        return (
            <React.Fragment>
                <BlockTitle>Здесь будут запросы на которые вы ответили.</BlockTitle>

            </React.Fragment>
        );
    }
}



export default connect()(OrdersPage)
