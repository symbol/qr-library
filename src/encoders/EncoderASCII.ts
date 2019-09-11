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

// internal dependencies
import {
    EncoderInterface,
    EncoderMinimalASCII,
    QRCodeSettings,
} from "../../index";

/**
 * Class `EncoderASCII` describes encoders utilities
 * for QR Codes that are to be displayed with the 
 * ASCII character set.
 *
 * @since 0.3.2
 */
export class EncoderASCII implements EncoderInterface {

    /**
     * Construct an ASCII encoder for said `qr` QR Code.
     * 
     * @param   {QRCodeImpl}    qr          The QRCode to encode.
     * @param   {number}        cellSize    The QRCode cell size.
     * @param   {number}        margin      The QRCode cell margin.
     */
    constructor(/**
                 * The QR Code that will be encoded.
                 * @var {QRCodeImpl}
                 */
                public readonly qr: QRCodeImpl,
                /**
                 * The Cell Size used for encoding in Pixel.
                 * @var {number}
                 */
                public readonly cellSize: number = QRCodeSettings.CELL_PIXEL_SIZE,
                /**
                 * The Cell Size used for encoding in Pixel.
                 * @var {number}
                 */
                public readonly margin: number = QRCodeSettings.MARGIN_PIXEL) {

    }

    /**
     * The `toString()` method should return a string
     * representation for the encoded QR Code.
     *
     * This specialization uses the ASCII encoding with
     * a cell size of at least *2*. The margin can be custom
     * or undefined and will then be set to _double the cell
     * size_.
     *
     * This implementation is a Typescript rewrite of the ASCII
     * encoding in below listed package.
     *
     * @see https://github.com/1w2w3y/qrcode-generator-ts
     * @return  {string}    The ASCII encoded QRCode.
     */
    public toString(): string {

        // use MinimalASCII for smaller cellSize
        if (this.cellSize < 2) {
            const encoder = new EncoderMinimalASCII(this.qr);
            return encoder.toString();
        }

        // prepare dimensions
        const cellSize = this.cellSize - 1;
        const margin = this.margin || this.cellSize * 2;

        // prepare iterations
        const size = this.qr.getModuleCount() * cellSize + margin * 2;
        const min = margin;
        const max = size - margin;
        let y, x, r, p;

        // prepare colors (double character to fill square)
        const white = Array(cellSize+1).join('██');
        const black = Array(cellSize+1).join('  ');

        // iterate through rows of QR
        let ascii = '';
        let line = '';
        for (y = 0; y < size; y += 1) {

            // reinitialize current row
            r = Math.floor((y - min) / cellSize);
            line = '';

            // iterate through columns of QR row
            for (x = 0; x < size; x += 1) {
                p = 1;

                if (min <= x && x < max 
                 && min <= y && y < max 
                 && this.qr.isDark(r, Math.floor((x - min) / cellSize))) {
                    p = 0;
                }

                // Output 2 characters per pixel, to create full square.
                // 1 character per pixels gives only half width of square.
                line += p ? white : black;
            }

            // append generated line to ASCII
            for (r = 0; r < cellSize; r += 1) {
                ascii += line + '\n';
            }
        }

        // trim last end-of-line
        return ascii.substring(0, ascii.length-1);
    }
}
