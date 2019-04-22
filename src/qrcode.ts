/*
   Copyright 2019 NEM

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
 */

import qrcode from 'qrcode-generator';

export class QRCodeGenerator {

    protected dataset: string;
    protected readonly errorCorrectLevel: any = 'L'; // Error correction level ('L', 'M', 'Q', 'H')
    protected readonly typeNumber: any = 0; // Type number (1 ~ 40), or 0 for auto detection
    protected readonly qrCellSizePixel: number = 5;
    protected readonly qrMarginPixel: number  = 5;

    /**
     * QR's Json object in string format.
     *
     * @param dataset {string}
     */
    constructor(dataset:string){
        this.dataset = dataset;
    }

    /**
     * Generate QR code in ASCII format.
     *
     * @return  {string} Return ASCII format, use in Terminal.
     */
    public toQR (): string {
        let qr = qrcode(this.typeNumber, this.errorCorrectLevel);
        qr.addData(this.dataset.replace(/ /g,''));
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
        qr.addData(this.dataset.replace(/ /g,''));
        qr.make();

        return qr.createDataURL(this.qrCellSizePixel,this.qrMarginPixel);
    }
};