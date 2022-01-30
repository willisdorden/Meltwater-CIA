import http from "../http-common";

class UploadFilesService {

    upload(file, onUploadProgress) {
        console.log(file.name)
        let name = file.name
        let formData = new FormData();

        formData.append("file", file);
        return http.post(`/upload/${file.name}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
            onUploadProgress,
        });
    }
    getFiles() {
        return http.get("/files");
    }
}


export default new UploadFilesService();
