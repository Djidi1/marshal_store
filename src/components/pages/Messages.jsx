import React from 'react';
import {
    Page,
    Messages,
    MessagesTitle,
    Messagebar,
    Link,
    Message,
    MessagebarAttachment,
    MessagebarAttachments,
    MessagebarSheet,
    MessagebarSheetImage,
} from 'framework7-react';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            attachments: [],
            sheetVisible: false,
            typingMessage: null,
            messagesData: [
                {
                    type: 'sent',
                    text: 'Please wait...',
                    date: new Date(),
                },
            ],
            images: [
                'https://cdn.framework7.io/placeholder/cats-300x300-1.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-2.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-3.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-4.jpg',
                'https://cdn.framework7.io/placeholder/cats-150x300-5.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-6.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x300-7.jpg',
                'https://cdn.framework7.io/placeholder/cats-200x300-8.jpg',
                'https://cdn.framework7.io/placeholder/cats-400x300-9.jpg',
                'https://cdn.framework7.io/placeholder/cats-300x150-10.jpg',
            ],
            responseInProgress: false,
        }
    }
    render() {

        return (
            <Page className={"messages-block"}>
                <Messagebar
                    placeholder={this.placeholder}
                    ref={(el) => {this.messagebarComponent = el}}
                    attachmentsVisible={this.attachmentsVisible}
                    sheetVisible={this.state.sheetVisible}
                    change={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
                    value={"Test message"}
                    onChange={this.handleMessage.bind(this)}
                >
                    <Link
                        iconIos="f7:camera_fill"
                        iconMd="material:camera_alt"
                        slot="inner-start"
                        onClick={() => {this.setState({sheetVisible: !this.state.sheetVisible})}}
                    />
                    <Link
                        iconIos="f7:arrow_up_fill"
                        iconMd="material:send"
                        slot="inner-end"
                        onClick={this.sendMessage.bind(this)}
                    />
                    <MessagebarAttachments>
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
                    </MessagebarSheet>
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
                            {message.text && (
                                <span slot="text" dangerouslySetInnerHTML={{__html: message.text}} />
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
    componentDidMount() {
        const self = this;
        const messagesData = self.props.messages.map( (item) => {
            return {
                name: "user name " + item.user_id,
                type: item.user_id === 1 ? 'sent' : 'received',
                text: item.message,
                date: item.updated_at,
            }
        });
        self.setState({messagesData: messagesData});

        self.$f7ready(() => {
            self.messagebar = self.messagebarComponent.f7Messagebar;
            self.messages = self.messagesComponent.f7Messages;
        });
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

    handleMessage(e) {
        const self = this;
        console.log(e);
    }
    sendMessage() {
        const self = this;
        const text = self.messagebar.getValue().replace(/\n/g, '<br>').trim();
        const messagesToSend = [];
        self.state.attachments.forEach((attachment) => {
            messagesToSend.push({
                image: attachment,
            });
        });
        if (text.trim().length) {
            messagesToSend.push({
                text,
                date: new Date(),
            });
        }
        if (messagesToSend.length === 0) {
            return;
        }

        self.setState({
            // Reset attachments
            attachments: [],
            // Hide sheet
            sheetVisible: false,
            // Send message
            messagesData: [...self.state.messagesData, ...messagesToSend],
        });
        self.messagebar.clear();

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
};