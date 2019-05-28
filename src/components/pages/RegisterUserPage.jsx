import React, {Component} from 'react';
import {
    Page,
    Navbar,
    List,
    ListInput,
    Block,
    BlockTitle,
    Button,
} from 'framework7-react';
import connect from "react-redux/es/connect/connect";
import {handleLogin} from "../../actions/UserActions";

import {setData} from "../../axios/setData";
import {authorisation} from "../../axios/login";

class RegisterUserPage extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            name: '',
            password: '',
        }
    }

    handleData = (name, value) => {
        this.setState({[name]: value});
    };

    registerUser = async () => {
        if (this.state.name === '') {
            this.$f7.toast.create({ text: 'Введите ваше имя',closeTimeout: 2000 }).open();
            return;
        }
        if (this.state.email === '') {
            this.$f7.toast.create({ text: 'Введите почтовый адрес',closeTimeout: 2000 }).open();
            return;
        }
        if (this.props.user.initial === 1 && this.state.password === '') {
            this.$f7.toast.create({ text: 'Введите пароль', closeTimeout: 2000 }).open();
            return;
        }

        this.$f7.dialog.preloader('Пожалуйста подождите...');
        const set_data = new setData();
        const user = this.props.user;
        user.name = this.state.name;
        user.email = this.state.email;
        user.initial = 0;

        const new_data = {email: user.email, name: user.name};
        new_data.password = this.state.password;
        new_data.c_password = this.state.password;
        new_data.initial = 0;
        new_data.role_id = 3;
        await set_data.dataPut(`register/`, new_data).then(() => {
            this.props.handleLogin(user);
            this.$f7.views.main.router.navigate('/');
            this.$f7.dialog.close();
        });

        await set_data.data('register', new_data).then(async data => {
            console.log(data);
            // auth user
            const auth = new authorisation();
            await auth.login(user.email, new_data.password).then( async response => {
                // записываем токен
                const user = response.data.success;
                await this.props.handleLogin(user);

                // restart page
                document.location.href='/';
            });
        });
    };

    render() {
        const {email, name, password} = this.state;

        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="main"
                    title={"Регистрация"}
                    backLink="Back"
                >
                </Navbar>
                <BlockTitle
                    style={{whiteSpace: 'initial'}}
                >После регистрации станут доступны дополнительные возможности.</BlockTitle>
                <List>
                    <ListInput
                        label="Имя пользователя"
                        floatingLabel
                        type="text"
                        placeholder="Ваше имя"
                        value={name}
                        onChange={(event) => this.handleData('name', event.target.value)}
                    />
                    <ListInput
                        label="Почта / Логин"
                        floatingLabel
                        type="email"
                        placeholder="Ваша почта"
                        autocomplete="username"
                        value={email}
                        onChange={(event) => this.handleData('email', event.target.value)}
                    />
                    <ListInput
                        label="Пароль"
                        floatingLabel
                        type="password"
                        placeholder="Введите пароль"
                        autocomplete="new-password"
                        value={password}
                        onChange={(event) => this.handleData('password', event.target.value)}
                    />
                </List>
                <Block>
                    <Button
                        fill
                        onClick={() => this.registerUser()}
                    >Зарегистрироваться</Button>
                </Block>
            </Page>
        );
    }
}


const mapStateToProps = store => {
    return {
        user: store.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: user => dispatch(handleLogin(user)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterUserPage)