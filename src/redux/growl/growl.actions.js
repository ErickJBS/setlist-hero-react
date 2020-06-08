import {SHOW_MESSAGE} from './growl.types';

export const showMessage = (message) => ({
    type: SHOW_MESSAGE,
    message: message
});
