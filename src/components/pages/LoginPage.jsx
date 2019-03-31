import React from 'react';
import {
    Page,
    List,
    ListInput,
    Button,
    BlockFooter,
    Link,
    LoginScreenTitle
} from 'framework7-react';

import { authorisation } from '../../axios/login'

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputLogin: '',
            inputPassword: '',
        };
    }

    authError = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon">7</i>',
        title: 'Маршал Сервис',
        subtitle: 'Ошибка авторизации',
        text: 'Проверьте имя пользователя и пароль.',
        closeButton: true,
    });

    authSuccess = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon">7</i>',
        title: 'Маршал Сервис',
        subtitle: 'Добро пожаловать!',
        closeTimeout: 3000,
    });

    handleOnChange = prop => event => {
      this.setState({[prop]: event.target.value});
    };

    async authentication() {
        const self = this;
        self.$f7.dialog.preloader();

        const auth = new authorisation();
        const { inputLogin, inputPassword} = this.state;
        const response = await auth.login(inputLogin, inputPassword);
        if (response.status === 401) {
            this.authError.open();
        }else if (response.status === 200) {
            this.authSuccess.open();
        }
        self.$f7.dialog.close();
        console.log(response);
    }
    render() {

        const { inputLogin, inputPassword} = this.state;

        return (
            <Page loginScreen>
                <LoginScreenTitle>Войти</LoginScreenTitle>
                <List form>
                    <ListInput
                        label="Email"
                        name="username"
                        placeholder="Email"
                        type="email"
                        value={inputLogin}
                        onChange={this.handleOnChange('inputLogin')}
                    />
                    <ListInput
                        label="Password"
                        name="password"
                        placeholder="Password"
                        type="password"
                        value={inputPassword}
                        onChange={this.handleOnChange('inputPassword')}
                    />

                    <BlockFooter>
                        <Button fill onClick={()=>this.authentication()}>Войти</Button>
                    </BlockFooter>
                </List>

                <List>
                    <BlockFooter>
                        <p><Link>Зарегистрироваться</Link></p>
                        <p>Для восстановления пароля нажмите <Link>ссылку</Link></p>
                    </BlockFooter>
                </List>
            </Page>
        )
    }
}

export default (LoginPage)