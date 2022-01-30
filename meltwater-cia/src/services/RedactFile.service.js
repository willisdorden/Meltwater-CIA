import http from "../http-common";

class RedactFileService {
    redactFile(data) {
        return http.post("redact/file", data);
    }
    searchWord(word) {
        return http.get(`search/word/${word}`);
    }
}

export default new RedactFileService();
