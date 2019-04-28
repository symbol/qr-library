import {Transaction} from "nem2-sdk";

/**
 * QRcode Scheme interface
 */
export interface QRScheme {
    toTransaction(): Transaction;
    build(): string;
    toQR(): string;
    toBase64(): string;
}