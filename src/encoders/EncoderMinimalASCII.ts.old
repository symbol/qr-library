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
    QRCodeSettings,
} from "../../index";

export class EncoderMinimalASCII implements EncoderInterface {

    /**
     * 
     */
    public readonly cellSize: number = 1;
    /**
     * 
     */
    public readonly margin: number = 2;

    /**
     * 
     */
    constructor(/**
                 * 
                 */
                public readonly qr: QRCodeImpl,) {

    }

    /**
     * 
     */
    public toString(): string {

        // prepare dimensions
        const cellSize = 1;
        const margin = cellSize * 2;

        // prepare iterations
        const size = this.qr.getModuleCount() * cellSize + margin * 2;
        const min = margin;
        const max = size - margin;
        let y, x, r1, r2, p;

        // prepare block types
        const blocks: any = {
            '██': '█',
            '█ ': '▀',
            ' █': '▄',
            '  ': ' '
        };

        const blocksLastLineNoMargin: any = {
            '██': '▀',
            '█ ': '▀',
            ' █': ' ',
            '  ': ' '
        };

        // iterate through rows of QR
        var ascii = '';
        for (y = 0; y < size; y += 2) {

            // reinitialize current row
            r1 = Math.floor((y - min) / cellSize);
            r2 = Math.floor((y + 1 - min) / cellSize);

            // iterate through columns of QR row
            for (x = 0; x < size; x += 1) {
                p = '█';

                // is current column dark and in-row ?
                if (min <= x && x < max 
                 && min <= y && y < max 
                 && this.qr.isDark(r1, Math.floor((x - min) / cellSize))) {
                    p = ' ';
                }

                // is current column *on next row* dark ?
                if (min <= x && x < max 
                 && min <= y+1 && y+1 < max
                 && this.qr.isDark(r2, Math.floor((x - min) / cellSize))) {
                    p += ' ';
                }
                else {
                    p += '█';
                }

                // output 2 characters per pixel, to create full square.
                // 1 character per pixels gives only half width of square.
                ascii += (margin < 1 && y+1 >= max) ? blocksLastLineNoMargin[p] : blocks[p];
            }

            ascii += '\n';
        }

        // do we need padding ?
        if (size % 2 && margin > 0) {
            return ascii.substring(0, ascii.length - size - 1) + Array(size+1).join('▀');
        }

        // trim last end-of-line
        return ascii.substring(0, ascii.length-1);
    }
}
