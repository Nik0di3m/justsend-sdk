// Enums
export enum BulkVariant {
  ECO = "ECO",
  FULL = "FULL",
  PRO = "PRO",
  ECO_RESP = "ECO_RESP",
  PRO_RESP = "PRO_RESP",
}

export enum BulkType {
  STANDARD = "STANDARD",
  PERSONALIZED = "PERSONALIZED",
  PARAMETRIZED = "PARAMETRIZED",
}

export enum BulkPriority {
  NORMAL = "NORMAL",
  ALERT = "ALERT",
}

export enum AcknowledgeStatus {
  DELIVERED = "DELIVERED",
  NOT_DELIVERED = "NOT_DELIVERED",
}

export enum TransactionType {
  CHARGE = "CHARGE",
  DEPOSIT = "DEPOSIT",
  REFUND = "REFUND",
}

export enum TransactionStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
}

export enum PaymentProvider {
  PAYU = "PAYU",
  DVP = "DVP",
  JUSTSEND = "JUSTSEND",
}

export enum PaymentMethod {
  BLIK = "BLIK",
  CARD = "CARD",
  POINTS = "POINTS",
  PROFORMA = "PROFORMA",
  PBL = "PBL",
  UNKNOWN = "UNKNOWN",
}

export enum ImportStatus {
  PENDING = "PENDING",
  SUCCESS = "SUCCESS",
  CANCELED = "CANCELED",
}

export enum UserAccountType {
  SLAVE = "SLAVE",
  MASTER = "MASTER",
  ADMIN = "ADMIN",
}

export enum PlatformType {
  PL = "PL",
  FR = "FR",
}

export enum Currency {
  PLN = "PLN",
}

// Basic interfaces
export interface SingleMessage {
  sender: string;
  msisdn: string;
  bulkVariant: BulkVariant;
  content: string;
}

export interface RestRecipient {
  msisdn: string;
  content?: string;
}

export interface RestBulkData {
  name: string;
  bulkType: BulkType;
  bulkVariant: BulkVariant;
  bulkPriority?: BulkPriority;
  sender: string;
  message?: string;
  groupId?: number;
  sendDate: string; // ISO date string
  recipients: RestRecipient[];
}

export interface Money {
  amount: number;
  currency: Currency;
}

export interface ImportResult {
  message?: string;
  code?: string;
  success?: boolean;
}

export interface RequestMetadata {
  requestSource?: string;
  userAgent?: string;
}

export interface BulkUploadDetails {
  name?: string;
  bulkType?: BulkType;
  bulkVariant?: BulkVariant;
  bulkPriority?: BulkPriority;
  sender?: string;
  to?: string;
  message?: string;
  sendDate?: string;
  requestMetadata?: RequestMetadata;
}

export interface BulkFileDescriptor {
  id?: number;
  path?: string;
  createDate?: string;
  uploadType?: "blacklist" | "blacklist-to-remove" | "group" | "bulk";
  importStatus?: ImportStatus;
  originalFileName?: string;
  userId?: number;
  uuid?: string;
  importResult?: ImportResult;
  bulkUploadDetails?: BulkUploadDetails;
}

export interface InvoiceEntity {
  id?: number;
  invoiceId?: number;
  invoiceNumber?: string;
  proformaId?: number;
  proformaNumber?: string;
}

export interface PaymentTransactionEntity {
  id?: number;
  userId: number;
  transactionDate?: string;
  transactionValue?: Money;
  amountInPoints?: number;
  accountBalanceInPoints?: number;
  transactionType?: TransactionType;
  paymentProvider?: PaymentProvider;
  paymentMethod?: PaymentMethod;
  transactionStatus?: TransactionStatus;
  transactionError?: string;
  internalTransactionId?: string;
  externalTransactionId?: string;
  bulkId?: number;
  platformType?: PlatformType;
  version?: number;
  createDate?: string;
  modifiedDate?: string;
  invoicingStatus?: string;
  invoice?: InvoiceEntity;
}

export interface BulkOverviewEntity {
  id?: number;
  userId?: number;
  userEmail?: string;
  userAccountType?: UserAccountType;
  userMasterId?: number;
  userPlatformType?: PlatformType;
  name?: string;
  uuid?: string;
  bulkType?: BulkType;
  bulkVariant?: BulkVariant;
  bulkStatus?: string;
  sender?: string;
  message?: string;
  chargedPoints?: number;
  sendDate?: string;
  createDate?: string;
  totalMessageCount?: number;
  recipientsCount?: number;
  sentCount?: number;
  deliveredCount?: number;
  sentUnconfirmedCount?: number;
  undeliveredCount?: number;
  notSentCount?: number;
  predictedFinishDate?: string;
  pointsPerSms?: number;
  reportId?: number;
  reportStatus?: "IN_PROGRESS" | "COMPLETED" | "FAILED";
}

export interface SendStatistics {
  sendDate?: string;
  recipientsCount?: number;
  messagesCount?: number;
  sentCount?: number;
  deliveredCount?: number;
  notDeliveredCount?: number;
}

export interface SingleMessageOverviewAggregation {
  sendDate?: string;
  userId?: number;
  userEmail?: string;
  userAccountType?: UserAccountType;
  userMasterId?: number;
  userPlatformType?: PlatformType;
  bulkVariant?: BulkVariant;
  sender?: string;
  acknowledgeStatus?: AcknowledgeStatus;
  recordCount?: number;
  chargedPoints?: number;
  messageCount?: number;
  deliveredCount?: number;
  undeliveredCount?: number;
}

export interface UserHistory {
  userId?: number;
  userMasterId?: number;
  userEmail?: string;
  bulkVariant?: BulkVariant;
  name?: string;
  sender?: string;
  msisdn?: string;
  content?: string;
  messageCount?: number;
  sendDate?: string;
  carrierId?: number;
  acknowledgeStatus?: AcknowledgeStatus;
  deliveryDate?: string;
  type?: string;
}

// Pageable responses
export interface PageableResponse<T> {
  content?: T[];
  totalPages?: number;
  totalElements?: number;
}

export type PageableResponseString = PageableResponse<string>;
export type PageableResponseBulkFileDescriptor =
  PageableResponse<BulkFileDescriptor>;
export type PageableResponseBulkOverviewEntity =
  PageableResponse<BulkOverviewEntity>;
export type PageableResponsePaymentTransactionEntity =
  PageableResponse<PaymentTransactionEntity>;
export type PageableResponseSendStatistics = PageableResponse<SendStatistics>;
export type PageableResponseSingleMessageOverviewAggregation =
  PageableResponse<SingleMessageOverviewAggregation>;
export type PageableResponseUserHistory = PageableResponse<UserHistory>;

// Request parameters interfaces
export interface BlacklistGetParams {
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface BulkFileDescriptorsParams {
  days?: number;
  importStatus?: ImportStatus;
  page: number;
  size: number;
  sortDirection?: "ASC" | "DESC";
  sortField?: string;
}

export interface PaymentTransactionsParams {
  paymentProvider?: PaymentProvider;
  paymentMethod?: PaymentMethod;
  transactionStatus?: TransactionStatus;
  startDate: string;
  endDate: string;
  search?: string;
  page?: number;
  size?: number;
  sortField?: string;
  sortDirection?: "ASC" | "DESC";
}

export interface SingleMessagesParams {
  startDate?: string;
  endDate?: string;
  showSlave?: boolean;
  page?: number;
  size?: number;
}

export interface BulksParams {
  showSlave?: boolean;
  fromDate?: string;
  toDate?: string;
  bulkStatus?: string;
  page?: number;
  size?: number;
  sortDirection?: "ASC" | "DESC";
  sortField?: string;
}

export interface UserHistoryParams {
  showSlave?: boolean;
  fromDate: string;
  toDate: string;
  bulkVariant?: BulkVariant;
  msisdn: string;
  page?: number;
  size?: number;
  sortDirection?: "ASC" | "DESC";
  sortField?: string;
}

export interface SendStatsParams {
  showSlave?: boolean;
  fromDate: string;
  toDate: string;
  bulkVariant?: BulkVariant;
  page?: number;
  size?: number;
  sortDirection?: "ASC" | "DESC";
  sortField?: string;
}

export interface SendStatsSumParams {
  showSlave?: boolean;
  fromDate: string;
  toDate: string;
  bulkVariant?: BulkVariant;
}

// File upload interface
export interface FileUploadRequest {
  name: string;
  sender: string;
  to?: string[];
  message?: string;
  groupId?: number;
  bulkType: BulkType;
  bulkVariant: BulkVariant;
  bulkPriority?: BulkPriority;
  sendDate: string;
}

// API Configuration
export interface JustsendConfig {
  apiKey: string;
  baseURL?: string;
  timeout?: number;
}

// Error interface
export interface JustsendError {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}
