import { Injectable } from "@angular/core";
import { Message } from "../interfaces/message";

@Injectable({
  providedIn: "root",
})
export class MessageService {
  messages: Message[] = [];

  add(message: Message): void {
    if (message.type === "console") {
      console.log(message);
    } else if (message.type === "success") {
      this.showMessageSuccess(message);
    } else {
      this.messages.push(message);
    }
  }

  showMessageSuccess(message: Message): void {
    this.clear();
    this.messages.push(message);
    setTimeout(() => {
      this.clear();
    }, 1500);
  }

  clear() {
    this.messages = [];
  }
}
