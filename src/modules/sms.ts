import { HttpClient } from "../client/http-client";

export interface SingleMessage {
  sender: string;
  msisdn: string;
  bulkVariant: "ECO" | "FULL" | "PRO" | "ECO_RESP" | "PRO_RESP";
  content: string;
}

export class SMSModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Send a single SMS message
   * @param message - SMS message data
   */
  async send(message: SingleMessage): Promise<void> {
    try {
      await this.httpClient.post<void>("/sender/singlemessage/send", message);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Send SMS with simple parameters
   * @param sender - Sender name (max 11 characters)
   * @param phoneNumber - Phone number in international format (e.g. 48500123456)
   * @param content - Message content
   * @param variant - Message variant (default ECO)
   */
  async sendSimple(
    sender: string,
    phoneNumber: string,
    content: string,
    variant: SingleMessage["bulkVariant"] = "ECO"
  ): Promise<void> {
    const message: SingleMessage = {
      sender,
      msisdn: phoneNumber,
      content,
      bulkVariant: variant,
    };

    await this.send(message);
  }
}
