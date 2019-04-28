/*
 * Copyright (c) 2019 Anthony Law for NEM Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License ");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {QRScheme} from "./QrScheme";
import {QRCodeType} from './QrCodeType'
import qrcode from 'qrcode-generator';
import {
    TransactionMapping,
    Transaction
} from "nem2-sdk";


export class TransactionRequestQR implements QRScheme{

    protected readonly errorCorrectLevel: any = 'L'; // Error correction level ('L', 'M', 'Q', 'H')
    protected readonly typeNumber: any = 0; // Type number (1 ~ 40), or 0 for auto detection
    protected readonly qrCellSizePixel: number = 5;
    protected readonly qrMarginPixel: number  = 5;

    /**
     *
     * @param data serialized data.
     * @param endpoint url for network node.
     */
    constructor(public readonly data: string,
        public readonly endpoint: string) {}

    /**
     * Create Transaction by serialized data.
     *
     * @return  {Transaction}
     */
    public toTransaction(): Transaction {
        return TransactionMapping.createFromPayload(this.data);
    }

    /**
     * Build QR schema in string format.
     *
     * @return  {string}
     */
    public build(): string {
        let schema = `{"schema":${QRCodeType.TransactionRequest},"network_id": ${this.toTransaction().networkType},"endpoint":"${this.endpoint.toString()}","data": ${JSON.stringify(this.toTransaction())}}`
        return schema.trim();
    }

    /**
     * Generate QR code in ASCII format.
     *
     * @return  {string} Return ASCII format, use in Terminal.
     */
    public toQR(): string {
        let qr = qrcode(this.typeNumber, this.errorCorrectLevel);
        qr.addData(this.build().replace(/ /g,''));
        qr.make();
        return qr.createASCII();
    }

    /**
     * Generate QRcode image Base64.
     *
     * @return  {string} Retrun image data in Base64.
     */
    public toBase64() : string {
        let qr = qrcode(this.typeNumber, this.errorCorrectLevel);
        qr.addData(this.build().replace(/ /g,''));
        qr.make();
        return qr.createDataURL(this.qrCellSizePixel,this.qrMarginPixel);
    }
}