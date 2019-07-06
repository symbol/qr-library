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

export class EncoderASCII implements EncoderInterface {

    /**
     * 
     */
    constructor(/**
                 * 
                 */
                public readonly qr: QRCodeImpl,
                /**
                 * 
                 */
                public readonly cellSize: number = QRCodeSettings.CELL_PIXEL_SIZE,
                /**
                 * 
                 */
                public readonly margin: number = QRCodeSettings.MARGIN_PIXEL) {

    }

    /**
     * 
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
