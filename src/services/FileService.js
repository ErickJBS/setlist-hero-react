import axios from 'axios'
import environment from 'environment';

const baseUrl = environment.api;

class FileService {

    getBade64(img) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(img);
            reader.onload = function () {
                resolve(reader.result)
            };
            reader.onerror = function (error) {
                reject(error);
            };
        });
    }

    async uploadImage(img) {
        const data = new FormData();
        data.append('data', img);
        const response = await axios.post(`${baseUrl}/files/upload`,data, {headers: {'content-type': 'multipart/form-data'}});
        return response?.data?.downloadUrl;
    }
}

export default new FileService();