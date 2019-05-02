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
import {
    ErrorCorrectLevel,
} from 'qrcode-generator-ts';

// internal dependencies
import {QRCodeType} from '../index';

/**
 * Class `QRCodeSettings` describes rules for the generation
 * of NIP-7 compliant QR Codes.
 *
 * @since 0.2.0
 */
export class QRCodeSettings {

    /**
     * The Error correction level.
     *
     * @var {ErrorCorrectLevel}
     */
    public static CORRECTION_LEVEL = ErrorCorrectLevel.L;

    /**
     * The QR Code version number.
     * 
     * With `40-L` configuration, the QR Code can contain
     * up to `2953` bytes. As defined in the following link,
     * this is the maximum storage capacity for our types
     * or QR Codes:
     * 
     *     https://en.wikipedia.org/wiki/QR_code#Design
     *
     * @see https://en.wikipedia.org/wiki/QR_code#Design
     * @var {string}
     */
    public static VERSION_NUMBER = 40;

    /**
     * The QR Code cell size in pixels.
     *
     * @var {number}
     */
    public static CELL_PIXEL_SIZE: number = 5;

    /**
     * The QR Code Margin in pixels.
     *
     * @var {number}
     */
    public static MARGIN_PIXEL: number = 5;
}
