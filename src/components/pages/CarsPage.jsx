import React from 'react';
import { connect } from "react-redux";

import {
    List,
    ListItem,
    SwipeoutActions,
    SwipeoutButton,
    Icon,
    Navbar,
    NavRight,
    Link,
    Page
} from 'framework7-react';

class carsPage extends React.Component {

    forward() {
        const app = this.$f7;
        app.dialog.alert('Favorite');
    }
    newCar() {
        const carId = 0;
        this.$f7.views.main.router.navigate('/open_car/' + carId + '/');
    }

    render() {
        const {cars, brands, models} = this.props;
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title="Мои автомобили"
                    backLink="Back"
                >
                    <NavRight>
                        <Link iconMd="material:add" onClick={() => this.newCar()}/>
                    </NavRight>
                </Navbar>
                <List
                    mediaList
                    className={"no-margin"}
                >
                    {
                        cars.map(car => (
                            <ListItem
                                key={'car_' + car.id}
                                swipeout
                                after={car.year}
                                subtitle={"VIN: " + car.vin}
                            >
                        <span slot="title">
                            <Icon className={"status-icon"} material="directions_car" color="blue"/>
                            {
                                ' ' + brands.find(brand => brand.id === car.car_brand_id).car_brand
                                + ' ' + models.find(model => model.id === car.car_model_id).car_model
                            }
                        </span>
                                <SwipeoutActions left>
                                    <SwipeoutButton color="blue" onClick={this.forward.bind(this)}>
                                        <Icon material="favorite"/> В избранное
                                    </SwipeoutButton>
                                </SwipeoutActions>
                            </ListItem>
                        ))
                    }

                </List>
            </Page>
        );
    }
}



const mapStateToProps = store => {
    return {
        cars: store.cars,
        models: store.carmodels,
        brands: store.carbrands,
    }
};


export default connect(mapStateToProps)(carsPage)