import axios from 'axios'
import environment from 'environment';

const baseUrl = environment.api;

class FileService {

    async uploadImage(img) {
        console.log(img);
        if (!img.type.match('image/*')) throw new Error('File not an image');
        const data = new FormData();
        data.append('data', img);
        const response = await axios.post(`${baseUrl}/storage/upload`,data, {headers: {'content-type': 'multipart/form-data'}});
        return response?.data?.downloadUrl;
    }
}

export default new FileService();