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
 * limitations under the License.
 */
/*
import {
    ErrorCorrectLevel,
    QRCode as QRCodeImpl,
    QR8BitByte,
} from 'qrcode-generator-ts';
*/

import * as QRCodeCanvas from 'qrcode';
import { createCanvas } from 'canvas';

import {
    NetworkType,
} from 'nem2-sdk';

// internal dependencies
import {
    QRCodeInterface,
    QRCodeType,
    QRCodeSettings,
    QRCodeDataSchema,
    //EncoderASCII,
} from "../index";

abstract class QRCode implements QRCodeInterface {

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
                 * The network ID.
                 * @var {number}
                 */
                public readonly networkType: NetworkType,
                /**
                 * The network generation hash.
                 * @var {string}
                 */
                public readonly generationHash: string,
                /**
                 * The base64 representation of the QR Code content.
                 * @var {string}
                 */
                public readonly base64: string|undefined = undefined) {
    }

    /// region Abstract Methods
    /**
     * The `getSchema()` method should return an instance
     * of a sub-class of QRCodeDataSchema which describes
     * the QR Code data.
     *
     * @return {QRCodeDataSchema}
     */
    public abstract getSchema(): QRCodeDataSchema;
    /**
     * The `getTypeNumber()` method should return the
     * version number for QR codes of the underlying class.
     *
     * @return {number}
     */
    public abstract getTypeNumber(): number;
    /// end-region Abstract Methods

    /**
     * The `getCorrectionLevel()` method should return the
     * QR Code correction level.
     * 
     * Sub-classes may overload this method to provide with
     * a different correction level.
     * 
     * @return {number}
     */
    public getCorrectionLevel(): 'M' | 'L' | 'S' {
        return 'M' //QRCodeSettings.CORRECTION_LEVEL;
    }

    /**
     * The `toJSON()` method should return the JSON
     * representation of the QR Code content.
     *
     * @return {string}
     */
    public toJSON(): string {

        // get the QR Code Data Schema
        const schema = this.getSchema();

        // create the JSON object for this QR Code
        const json = schema.toObject(this);

        // format to JSON
        return JSON.stringify(json);
    }

    /**
     * Generate QRcode image Base64.
     *
     * @return  {string} Return image data in Base64.
     */
    public async toBase64(): Promise<string> {

        // get JSON representation
        const json = this.toJSON()

        // get base64 representation
        return await QRCodeCanvas.toDataURL(json, {
            errorCorrectionLevel: 'M', //this.getCorrectionLevel(),
            width: 250,
            // do-not-set-'version'
        });
    }

    /**
     * Generate QRCode to be printed in ASCII format.
     *
     * @return {string}
     
    public toASCII() {

        // build the QR Code
        const qr = this.build();

        // encode with ASCII/MinimalASCII encoder
        const encoder = new EncoderASCII(qr);

        // return string representation
        return encoder.toString();
    }*/

    /**
     * Generate QRCode to be printed on a `node-canvas`. This
     * is compatible with the browser and node.
     *
     * @see https://www.npmjs.com/package/qrcode
     * @see https://www.npmjs.com/package/canvas
     * @param   {number}    cellSize     QRcode cell size
     * @param   {number}    margin       QRcode cell margin
     * @return  {string}
     */
    public async toCanvas(): Promise<any> {

        // get JSON representation
        const json = this.toJSON();

        // create canvas
        const canvas = createCanvas(250, 250);
        const context = canvas.getContext('2d');

        // build the QR Code
        return await QRCodeCanvas.toCanvas(canvas, json, {
            errorCorrectionLevel: 'M', // this.getCorrectionLevel(),
            width: 250,
            // do-not-set-'version'
        });
    }
}

export {QRCode};
