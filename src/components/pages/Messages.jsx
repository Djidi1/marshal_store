import React from 'react';
import {
    Page,
    Messages,
    // MessagesTitle,
    Messagebar,
    Link,
    Message,
   /* MessagebarAttachment,
    MessagebarAttachments,
    MessagebarSheet,
    MessagebarSheetImage,*/
} from 'framework7-react';
import {Detector} from "react-detect-offline";
import {getData} from "../../axios/getData";
import {setData} from "../../axios/setData";
import {get} from "idb-keyval";
import {handleResponse} from "../../actions/DataActions";
import connect from "react-redux/es/connect/connect";

const getMessages = async (props, answer_id, loading) => {
    let detect = new Detector();
    loading.show('yellow');
    if (await detect.state.online) {
        let get_data = new getData();
        await get_data.data('answer/' + answer_id).then(value => value !== undefined && props.handleResponse(value));
    }else{
        await get('answer/' + answer_id).then(value => value !== undefined && props.handleResponse(value));
    }
    setTimeout(() => {
        loading.hide();
    }, 500);
};

const sendMessage = async (props, payload, notificationOffline) => {
    let detect = new Detector();
    if (await detect.state.online) {
        let set_data = new setData();
        payload.forEach(data => {
            set_data.data('message-add', data);
        });
    }else{
        notificationOffline.open();
    }
};

class respMessages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messageValue: '',
            attachments: [],
            sheetVisible: false,
            typingMessage: null,
            messagesData: [
                {
                    type: 'received',
                    message: 'Здравствуйте! 👋<br/>Здесь вы можете уточнить детали заказа.',
                    date: new Date(),
                },
            ],
            images: [],
            responseInProgress: false,
        }
    }

    answer_id = this.props.response.id;
    user = this.props.user;

    notificationOffline = this.$f7.notification.create({
        icon: '<i class="icon marshal-icon"> </i>',
        title: 'Маршал Сервис',
        subtitle: 'Ошибка подключения',
        text: 'Попробуйте повторить запрос позже.',
        closeButton: true,
    });

    loading = this.$f7.progressbar;

    render() {

        return (
            <Page className={"messages-block"}>
                <Messagebar
                    placeholder={this.placeholder}
                    ref={(el) => {this.messagebarComponent = el}}
                    attachmentsVisible={this.attachmentsVisible}
                    sheetVisible={this.state.sheetVisible}
                    change={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
                    value={this.state.messageValue}
                    //onChange={this.handleMessage.bind(this)}
                    onInput={this.handleMessage.bind(this)}
                >
                   {/* <Link
                        iconIos="f7:camera_fill"
                        iconMd="material:camera_alt"
                        slot="inner-start"
                        onClick={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
                    />*/}
                    <Link
                        iconIos="f7:arrow_up_fill"
                        iconMd="material:send"
                        slot="inner-end"
                        onClick={this.sendMessage.bind(this)}
                    />
                   {/* <MessagebarAttachments>
                        {this.state.attachments.map((image, index) => (
                            <MessagebarAttachment
                                key={index}
                                image={image}
                                onAttachmentDelete={() => this.deleteAttachment(image)}
                            />
                        ))}
                    </MessagebarAttachments>
                    <MessagebarSheet>
                        {this.state.images.map((image, index) => (
                            <MessagebarSheetImage
                                key={index}
                                image={image}
                                checked={this.state.attachments.indexOf(image) >= 0}
                                onChange={this.handleAttachment.bind(this)}
                            />
                        ))}
                    </MessagebarSheet>*/}
                </Messagebar>

                <Messages ref={(el) => {this.messagesComponent = el}}>
                    {/*<MessagesTitle><b>Sunday, Feb 9,</b> 12:58</MessagesTitle>*/}

                    {this.state.messagesData.map((message, index) => (
                        <Message
                            key={index}
                            type={message.type}
                            image={message.image}
                            name={message.name}
                            avatar={message.avatar}
                            footer={message.date.toLocaleString()}
                            first={this.isFirstMessage(message, index)}
                            last={this.isLastMessage(message, index)}
                            tail={this.isTailMessage(message, index)}
                        >
                            {message.message && (
                                <span slot="text" dangerouslySetInnerHTML={{__html: message.message}} />
                            )}
                        </Message>
                    ))}
                    {this.state.typingMessage && (
                        <Message
                            type="received"
                            typing={true}
                            first={true}
                            last={true}
                            tail={true}
                            header={`${this.state.typingMessage.name} is typing`}
                            avatar={this.state.typingMessage.avatar}
                        />
                    )}
                </Messages>
            </Page>
        )
    }

    get attachmentsVisible() {
        const self = this;
        return self.state.attachments.length > 0;
    }
    get placeholder() {
        const self = this;
        return self.state.attachments.length > 0 ? 'Добавьте сообщение или отправьте' : 'Сообщение';
    }
    updateMessages() {
        const self = this;
        if (self.props.response.messages.length) {
            const messagesData = self.props.response.messages.map((item) => {
                return {
                    name: item.user.name,
                    type: item.user_id === 1 ? 'sent' : 'received',
                    message: item.message,
                    date: item.updated_at,
                }
            });
            self.setState({messagesData: messagesData});
        }
    }
    componentWillReceiveProps() {
        this.updateMessages();
    }
    componentDidMount() {
        const self = this;
        this.updateMessages();
        self.$f7ready(() => {
            self.messagebar = self.messagebarComponent.f7Messagebar;
            self.messages = self.messagesComponent.f7Messages;
        });

        this.intervalId = setInterval(()  => getMessages(self.props, self.answer_id, self.loading), 5000);
    }
    componentWillUnmount(){
        clearInterval(this.intervalId);
    }
    isFirstMessage(message, index) {
        const self = this;
        const previousMessage = self.state.messagesData[index - 1];
        if (message.isTitle) return false;
        return !previousMessage || previousMessage.type !== message.type || previousMessage.name !== message.name;

    }
    isLastMessage(message, index) {
        const self = this;
        const nextMessage = self.state.messagesData[index + 1];
        if (message.isTitle) return false;
        return !nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name;

    }
    isTailMessage(message, index) {
        const self = this;
        const nextMessage = self.state.messagesData[index + 1];
        if (message.isTitle) return false;
        return !nextMessage || nextMessage.type !== message.type || nextMessage.name !== message.name;

    }
    deleteAttachment(image) {
        const self = this;
        const attachments = self.state.attachments;
        const index = attachments.indexOf(image);
        attachments.splice(index, 1);
        self.setState({ attachments });
    }
    handleAttachment(e) {
        const self = this;
        const attachments = self.state.attachments;
        const index = self.$$(e.target).parents('label.checkbox').index();
        const image = self.state.images[index];
        if (e.target.checked) {
            // Add to attachments
            attachments.unshift(image);
        } else {
            // Remove from attachments
            attachments.splice(attachments.indexOf(image), 1);
        }
        self.setState({ attachments });
    }

    handleMessage() {
        const self = this;
        let text = self.messagebar.$textareaEl.val();
        self.setState({messageValue: text});
    }
    sendMessage() {
        const self = this;
        const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        self.state.attachments.forEach((attachment) => {
            messagesToSend.push({
                answer_id: self.answer_id,
                user_id: self.user.id,
                name: self.user.name,
                message: "",
                attachment: attachment,
                date: new Date(),
            });
        });
        if (text.trim().length) {
            messagesToSend.push({
                answer_id: self.answer_id,
                user_id: self.user.id,
                name: self.user.name,
                message: text,
                attachment: "",
                date: new Date(),
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }

        self.setState({
            messageValue: '',
            // Reset attachments
            attachments: [],
            // Hide sheet
            sheetVisible: false,
            // Send message
            messagesData: [...self.state.messagesData, ...messagesToSend],
        });

        sendMessage(this.props, messagesToSend, this.notificationOffline).then(() => {
            self.messagebar.clear();
        });

        // Focus area
        if (text.length) self.messagebar.focus();
/*
        // Mock response
        if (self.state.responseInProgress) return;
        self.setState({
            responseInProgress: true,
        });
        */
    }
}

const mapStateToProps = store => {
    return {
        response: store.response[0],
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleResponse: request => dispatch(handleResponse(request)),
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(respMessages)