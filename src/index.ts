import { HttpClient } from "./client/http-client";
import { SMSModule, SingleMessage } from "./modules/sms";

export interface JustsendConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

export class JustsendSDK {
  private httpClient: HttpClient;
  public sms: SMSModule;

  constructor(config: JustsendConfig) {
    this.httpClient = new HttpClient(config);
    this.sms = new SMSModule(this.httpClient);
  }
}

// Export types and interfaces
export { SingleMessage } from "./modules/sms";
export { JustsendError } from "./types";

export default JustsendSDK;
