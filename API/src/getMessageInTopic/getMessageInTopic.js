import axios from 'axios';
require("dotenv").config();

import {DRAGONGLASS_ACCESS_KEY as myDragonglassAccessKey, DRAGONGLASS_API_KEY as myDragonglassApiKey} from '../env'

const hex_to_ascii = (str1) => {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
        str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
}

export const getMessageInTopic = async (_topicId) => {

    console.log("myDragonglassAccessKey", myDragonglassAccessKey)
    console.log("myDragonglassApiKey", myDragonglassApiKey)

    try {
        const res = await axios.get(`https://api-testnet.dragonglass.me/hedera/api/v1/topics/${_topicId}/messages`, {
            headers: {
                "X-API-KEY": `${myDragonglassAccessKey}`
            }
        })
        const DATA = res.data;
        let listOfMessages = []

        DATA.data.map((r) => {
            let msgString = hex_to_ascii(r.message.toString())
            listOfMessages.push(msgString)
        })

        return {
            result: { messages: listOfMessages },
            error: false,
            message: 'All messages of this topic are fetched'
        }

    } catch (err) {
        console.log("ER", err)
        return {
            result: undefined,
            error: true,
            message: `Error while fetching messages - ${err}`
        }
    }
}