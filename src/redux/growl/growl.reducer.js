import {SHOW_MESSAGE} from './growl.types';

const INITIAL_STATE = {
    messages: []
}

const growlMessages = (state = INITIAL_STATE, action) => {
    const {type, message} = action;
    switch (type) {
        case SHOW_MESSAGE:
            let messages = [];
            messages.push(message);
            return {messages: messages};
        default:
            return state;
    }
}

export default growlMessages;