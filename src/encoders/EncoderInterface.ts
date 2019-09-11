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
    QRCode as QRCodeImpl,
} from 'qrcode-generator-ts';

/**
 * Interface `EncoderInterface` describes encoders utilities
 * for QR Codes that are compliant with NIP-7
 *
 * @since 0.3.2
 */
export interface EncoderInterface {

    /**
     * The QR Code that will be encoded.
     * @var {QRCodeImpl}
     */
    qr: QRCodeImpl;

    /**
     * The Cell Size used for encoding in Pixel.
     * @var {number}
     */
    cellSize: number;

    /**
     * The margin used for encoding in Pixel
     * @var {number}
     */
    margin: number;

    /**
     * The `toString()` method should return a string
     * representation for the encoded QR Code.
     *
     * @return {string}
     */
    toString(): string;
}
