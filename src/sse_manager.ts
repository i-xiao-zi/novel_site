
class SSeManager {
    static cover(url: string) {
        return new Promise((resolve, reject) => {
            const es = new EventSource(`/api/cover?url=${url}`);
            resolve(es.onmessage)
            es.onerror = (event) => {
                es.close()
                reject(event)
            }
            es.onopen = (event) => {
                console.log(event);
            }
        })
    }
}
export default SSeManager