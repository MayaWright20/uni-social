type WebSocketCallbacks = {
  onMessage: (data: unknown) => void;
  onOpen?: () => void;
  onClose?: () => void;
  onError?: (error: Event) => void;
};

export class ChatWebSocket {
  private ws: WebSocket | null = null;
  private url: string;
  private callbacks: WebSocketCallbacks;
  private reconnectAttempts = 0;
  private maxReconnectDelay = 30000;
  private shouldReconnect = true;
  private messageQueue: string[] = [];

  constructor(url: string, callbacks: WebSocketCallbacks) {
    this.url = url;
    this.callbacks = callbacks;
    this.connect();
  }

  private connect() {
    if (!this.shouldReconnect) return;

    this.ws = new WebSocket(this.url);

    this.ws.onopen = () => {
      this.reconnectAttempts = 0;
      this.flushQueue();
      this.callbacks.onOpen?.();
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this.callbacks.onMessage(data);
      } catch {
        this.callbacks.onMessage(event.data);
      }
    };

    this.ws.onclose = () => {
      this.callbacks.onClose?.();
      this.scheduleReconnect();
    };

    this.ws.onerror = (error) => {
      this.callbacks.onError?.(error);
    };
  }

  private scheduleReconnect() {
    const delay = Math.min(
      1000 * Math.pow(2, this.reconnectAttempts),
      this.maxReconnectDelay,
    );
    this.reconnectAttempts++;

    setTimeout(() => {
      if (this.shouldReconnect) {
        this.connect();
      }
    }, delay);
  }

  private flushQueue() {
    while (this.messageQueue.length > 0) {
      const message = this.messageQueue.shift();
      if (message) {
        this.ws?.send(message);
      }
    }
  }

  send(data: unknown) {
    const message = JSON.stringify(data);

    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(message);
    } else {
      this.messageQueue.push(message);
    }
  }

  disconnect() {
    this.shouldReconnect = false;
    this.messageQueue = [];
    this.ws?.close();
    this.ws = null;
  }
}
