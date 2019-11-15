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
import { Observable } from 'rxjs';

// internal dependencies
import {
    QRCodeSettings,
    QRCodeStreamType,
    QRCodeType,
} from '../index';

/**
 * Interface `QRCodeInterface` describes rules for the definition
 * of NIP-7 compliant QR Codes.
 *
 * @since 0.2.0
 */
interface QRCodeInterface {

    /**
     * The type of the QR Code.
     */
    type: QRCodeType;

    /**
     * The `toJSON()` method should return the JSON
     * representation of the QR Code content.
     *
     * @return {string}
     */
    toJSON(): string;

    /**
     * The `toBase64()` method should return the base64
     * representation of the QR Code content.
     *
     * @param   {QRCodeSettings}    settings
     * @return  {string}
     */
    toBase64(
        settings: QRCodeSettings,
    ): Observable<string>;

    /**
     * The `toString()` method should return the string
     * representation of the QR Code content.
     *
     * @param   {QRCodeSettings}    settings
     * @param   {QRCodeStreamType}  streamType
     * @return {string}
     */
    toString(
        settings: QRCodeSettings,
        streamType: QRCodeStreamType,
    ): Observable<string>;
}

export {QRCodeInterface};
