import React, {Component} from 'react';
import {
    Page,
    Navbar,
    Block,
    Link,
    List,
    ListInput,
    BlockHeader,
    BlockTitle,
} from 'framework7-react';

export default class RequestPage extends Component {
    render() {
        return (
            <Page>
                <Navbar
                    color="white"
                    textColor="white"
                    bgColor="red"
                    title="Заявка"
                    backLink="Back"
                />
                {/*<Block strong>
                    <ul>
                        {Object.keys(this.$f7route.params).map(key => (
                            <li key={key}><b>{key}:</b> {this.$f7route.params[key]}</li>
                        ))}
                    </ul>
                </Block>*/}
                <Block>
                    <BlockHeader className="text-align-right">12.03.2019</BlockHeader>
                    <List noHairlinesMd>
                        <ListInput
                            outline
                            label="Заголовок"
                            floatingLabel
                            type="text"
                            placeholder="Описание того что необходимо..."
                        />
                        <ListInput
                            outline
                            label="Текст заявки"
                            floatingLabel
                            type="textarea"
                            resizable
                            placeholder="Описание того что необходимо..."
                        />
                    </List>
                    <BlockTitle Large><b>Ford</b> Fiesta</BlockTitle>
                    <Link
                        href="/messages/"
                    >переписка</Link>
                </Block>
               {/* <Block strong>
                    <Link onClick={() => this.$f7router.back()}>Назад</Link>
                </Block>*/}
            </Page>
        );
    }
}