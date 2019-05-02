/**
 * Copyright 2019 NEM
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 *limitations under the License.
 */
import * as QRCode from 'qrcode-generator';

// internal dependencies
import {
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
} from "../index";

export abstract class QRCodeBase implements QRCodeInterface {

    /**
     * Construct a QR Code instance out of its base64
     * representation and type.
     * 
     * @param   type    {QRCodeType}
     * @param   base64  {string}
     */
    constructor(/**
                 * The QR Code type.
                 * @var {QRCodeType}
                 */
                public readonly type: QRCodeType,
                /**
                 * The base64 representation of the QR Code content.
                 * @var {string}
                 */
                public readonly base64: string|undefined = undefined) {

    }

    /// region Abstract Methods
    /**
     * The `toJSON()` method should return the JSON
     * representation of the QR Code content.
     *
     * @return {string}
     */
    public abstract toJSON(): string;
    /// end-region Abstract Methods

    /**
     * The `build()` method should return the QRCode
     * representation of the QR Code content.
     *
     * @return {QRCode}
     */
    public build(): QRCode {

        // prepare QR generation
        const qr = qrcode(
            QRCodeSettings.QRCODE_LOWLEVEL_TYPE as TypeNumber,
            QRCodeSettings.CORRECTION_LEVEL as ErrorCorrectionLevel
        );

        // get JSON representation
        const json = this.toJSON();

        // build QR code
        qr.addData(json);
        qr.make();
        return qr;
    }

    /**
     * Generate QRcode image Base64.
     *
     * @return  {string} Retrun image data in Base64.
     */
    public toBase64() : string {

        // build QR Code
        const qr = this.build();

        // get base64 representation
        return qr.createDataURL(
            QRCodeSettings.CELL_PIXEL_SIZE,
            QRCodeSettings.MARGIN_PIXEL
        );
    }

    /**
     * Generate QRcode SVG tag (HTML).
     *
     * @return  {string} Retrun SVG HTML tag for QR Code.
     */
    public toSVG() : string {

        // build QR Code
        const qr = this.build();

        // get HTML SVG tag
        return qr.createSvgTag(
            QRCodeSettings.CELL_PIXEL_SIZE,
            QRCodeSettings.MARGIN_PIXEL
        );
    }

    /**
     * Generate QRcode IMG tag (HTML).
     *
     * @return  {string} Retrun IMG HTML tag for QR Code.
     */
    public toIMG() : string {

        // build QR Code
        const qr = this.build();

        // get HTML IMG tag
        return qr.createImgTag(
            QRCodeSettings.CELL_PIXEL_SIZE,
            QRCodeSettings.MARGIN_PIXEL
        );
    }
}