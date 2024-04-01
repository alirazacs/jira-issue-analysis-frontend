import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private messageService: MessageService) { }

  showToastMessage(severity: string, summary: string, message: string) {
    this.messageService.clear();
    this.messageService.add({severity:severity, summary:summary, detail: message});
  }
}
