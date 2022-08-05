export class HTTPRequestAPI {
    get = async (url, params) => {

        try {
            const response = await axiosClient.get(url, params);
            return response;

        } catch (error) {
            console.log(error)
        }
    }
    post = async (url, data) => {

        try {
            const response = await axiosClient.post(url, data);
            return response;

        } catch (error) {
            console.log(error)
        }
    }
    delete = async (url, data) => {

        try {
            const response = await axiosClient.delete(url, data);
            return response;

        } catch (error) {
            console.log(error)
        }
    }
    put = async (url, data) => {

        try {
            const response = await axiosClient.put(url, data);
            return response;

        } catch (error) {
            console.log(error)
        }
    }
}

export const httpRequest = new HTTPRequestAPI();