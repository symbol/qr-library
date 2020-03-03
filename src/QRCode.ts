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
import { createCanvas } from 'canvas';
import { NetworkType } from 'symbol-sdk';
import * as QRCodeCanvas from 'qrcode';
import {
    from as observableFrom,
    Observable,
} from 'rxjs';

// internal dependencies
import {
    CorrectionLevel,
    QRCodeDataSchema,
    QRCodeInterface,
    QRCodeSettings,
    QRCodeStreamType,
    QRCodeType,
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
                public readonly base64?: string) {
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
    public getCorrectionLevel(): CorrectionLevel {
        return 'M';
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
     * The returned string can be put in the `src` attribute
     * of a `<img />` tag directly in HTML. The produced image
     * will be a PNG.
     *
     * @param   {QRCodeSettings}    settings     (Optional) Settings for generation
     * @return  {Observable<string>} Return image data in Base64.
     */
    public toBase64(
        settings: QRCodeSettings = new QRCodeSettings(),
    ): Observable<string> {

        // get JSON representation
        const json = this.toJSON();

        // get base64 representation
        return observableFrom(QRCodeCanvas.toDataURL(json, {
            errorCorrectionLevel: settings.correctionLevel,
            width: settings.widthPixel,
            // do-not-set-'version'
        }));
    }

    /**
     * Generate QRCode as a string. This permits to display SVG
     * format, Terminal format or utf-8 format.
     *
     * @see https://www.npmjs.com/package/qrcode
     * @param   {QRCodeSettings}    settings     (Optional) Settings for generation
     * @param   {QRCodeTextType}    streamType   (Optional) The QR Code text type, defaults to "terminal"
     * @return  {Observable<string>}
     */
    public toString(
        settings: QRCodeSettings = new QRCodeSettings(),
        streamType: QRCodeStreamType = QRCodeStreamType.Terminal,
    ): Observable<string> {

        // get JSON representation
        const json = this.toJSON();

        // build the QR Code
        return observableFrom(QRCodeCanvas.toString(json, {
            errorCorrectionLevel: settings.correctionLevel,
            width: settings.widthPixel,
            type: streamType,
            // do-not-set-'version'
        }));
    }

    /**
     * Generate QRCode and return object.
     *
     * @see https://www.npmjs.com/package/qrcode
     * @param   {QRCodeSettings}    settings     (Optional) Settings for generation
     * @return  {Observable<string>}
     */
    public toObject(
        settings: QRCodeSettings = new QRCodeSettings(),
    ): Observable<any> {

        // get JSON representation
        const json = this.toJSON();

        // build the QR Code
        return observableFrom([QRCodeCanvas.create(json, {
            errorCorrectionLevel: settings.correctionLevel,
            // do-not-set-'width'
            // do-not-set-'version'
        })]);
    }

    /**
     * Generate QRCode to be printed on a `node-canvas`. This
     * is compatible with the browser and node.
     *
     * @see https://www.npmjs.com/package/qrcode
     * @see https://www.npmjs.com/package/canvas
     * @param   {QRCodeSettings}    settings     (Optional) Settings for generation
     * @return  {Observable<string>}
     */
    public toCanvas(
        settings: QRCodeSettings = new QRCodeSettings(),
    ): Observable<string> {

        // get JSON representation
        const json = this.toJSON();

        // create canvas
        const canvas = createCanvas(250, 250);
        const context = canvas.getContext('2d');

        // build the QR Code
        return observableFrom(QRCodeCanvas.toCanvas(canvas, json, {
            errorCorrectionLevel: settings.correctionLevel,
            width: settings.widthPixel,
            // do-not-set-'version'
        }));
    }
}

export {QRCode};
