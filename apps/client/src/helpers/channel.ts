const broadcast = new BroadcastChannel('shopify-app-bridge');
console.log('broadcast: ', broadcast);
class Channel {
    broadcast: BroadcastChannel;

    constructor() {
        this.broadcast = broadcast;
    }

    emit(event: string, payload?: unknown) {
        this.broadcast.postMessage({ event, payload });
    }

    on<Payload = unknown>(event: string, callback: (payload: Payload) => void, options?: { once: boolean }) {
        this.broadcast.addEventListener('message', (message) => {
            if (message.data.event === event) {
                callback(message.data.payload as Payload);
            }
        }, { once: options?.once });
    }

    request<Response = unknown>(event: string, eventResponse: string, payload?: unknown): Promise<Response> {
        return new Promise((resolve) => {
            this.on<Response>(eventResponse, resolve);
            this.emit(event, payload);
        });
    }
}

export default new Channel();
