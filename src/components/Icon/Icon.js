import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faPaperPlane
} from '@fortawesome/free-solid-svg-icons'



const Icon = (props) => <FontAwesomeIcon {...props} />
const SendIcon = (props) => <FontAwesomeIcon icon={faPaperPlane} {...props} />

export {
    Icon,
    SendIcon
}