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
     * Error correction level.
     * Possible value: 'L', 'M', 'Q', 'H'
     *
     * @var {string}
     */
    public static CORRECTION_LEVEL: string = 'L';

    /**
     * The lowlevel QR Code type number.
     * Type number (1 ~ 40), or 0 for auto detection
     *
     * @var {number}
     */
    public static QRCODE_LOWLEVEL_TYPE: number = 0;

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
