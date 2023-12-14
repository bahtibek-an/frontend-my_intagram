import axios from 'axios';

export const callPostApiWithoutAuth = (url, data, successCallback, failedCallback) => {
    axios
        .post(url, data)
        .then((response) => successCallback(response))
        .catch((error) => failedCallback(error));
};
