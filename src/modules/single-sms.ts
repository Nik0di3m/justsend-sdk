import { HttpClient } from "../client/http-client";
import { SingleMessage } from "../types";

export class SingleSMSModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Send a single SMS message
   * @param message - The SMS message to send
   * @returns Promise that resolves when message is sent
   */
  async send(message: SingleMessage): Promise<void> {
    await this.httpClient.post<void>("/sender/singlemessage/send", message);
  }

  /**
   * Send a single SMS message with custom parameters
   * @param sender - Sender identifier
   * @param msisdn - Phone number in international format (e.g., 48500123456)
   * @param content - Message content
   * @param bulkVariant - Message variant (ECO, FULL, PRO, ECO_RESP, PRO_RESP)
   * @returns Promise that resolves when message is sent
   */
  async sendMessage(
    sender: string,
    msisdn: string,
    content: string,
    bulkVariant: SingleMessage["bulkVariant"]
  ): Promise<void> {
    const message: SingleMessage = {
      sender,
      msisdn,
      content,
      bulkVariant,
    };

    await this.send(message);
  }
}
