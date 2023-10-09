import axios from 'axios';

export class MyUploadAdapter {
    private loader: any;

    constructor(loader: any) {
        this.loader = loader;
    }

    upload() {
        return this.loader.file.then(
            (file: any) =>
                new Promise((resolve, reject) => {
                    const formData = new FormData();
                    formData.append('file', file);

                    axios
                        .post('/api/upload', formData)
                        .then((response) => {
                            resolve({ default: response.data.url });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }),
        );
    }
}
