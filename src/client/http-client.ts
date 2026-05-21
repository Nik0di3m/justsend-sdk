import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
import { JustsendConfig, JustsendError } from "../types";

export class HttpClient {
  private axiosInstance: AxiosInstance;
  private apiKey: string;

  constructor(config: JustsendConfig) {
    this.apiKey = config.apiKey;

    this.axiosInstance = axios.create({
      baseURL: config.baseURL || "https://justsend.io/api",
      timeout: config.timeout || 30000,
      headers: {
        "Content-Type": "application/json",
        "App-Key": this.apiKey,
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add timestamp to prevent caching
        config.params = {
          ...config.params,
          _t: Date.now(),
        };
        return config;
      },
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        return Promise.reject(this.handleError(error));
      }
    );
  }

  private handleError(error: AxiosError): JustsendError {
    let message = error.message || "Unknown error occurred";
    let code: string | undefined;
    const status = error.response?.status;
    const details = error.response?.data;

    // Odpowiedzi błędów API JustSend niosą message/code w body — wyciągamy je,
    // żeby komunikat błędu był konkretny, a nie gołe "Request failed...".
    if (details && typeof details === "object") {
      const responseData = details as Record<string, unknown>;
      if (typeof responseData.message === "string") {
        message = responseData.message;
      }
      if (typeof responseData.code === "string") {
        code = responseData.code;
      }
    }

    return new JustsendError(message, { status, code, details });
  }

  async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.get(url, {
      params,
    });
    return response.data;
  }

  async post<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(url, data);
    return response.data;
  }

  async put<T>(url: string, data?: any): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.put(url, data);
    return response.data;
  }

  async delete<T>(url: string): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.delete(url);
    return response.data;
  }

  async postFormData<T>(url: string, formData: FormData): Promise<T> {
    const response: AxiosResponse<T> = await this.axiosInstance.post(
      url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  // Method to update API key
  updateApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    this.axiosInstance.defaults.headers["App-Key"] = apiKey;
  }

  // Method to get current API key
  getApiKey(): string {
    return this.apiKey;
  }
}
