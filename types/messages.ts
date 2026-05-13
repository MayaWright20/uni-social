export type MessageStatus =
  | { type: "sending" }
  | { type: "sent" }
  | { type: "delivered" }
  | { type: "read"; readAt: Date }
  | { type: "failed"; error: string };

export type ChatMessage = {
  id: string;
  author: string;
  text: string;
  createdAt: Date;
  status: MessageStatus;
};
