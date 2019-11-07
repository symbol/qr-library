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
// internal dependencies
import {QRCode} from '../index';

/**
 * Class `QRCodeDataSchema` describes a QR Code's data
 * schema. The schema defines obligatory fields and their
 * format.
 *
 * @since 0.3.0
 */
abstract class QRCodeDataSchema {

    /**
     * The AccountQR QR Code version
     *
     * @var {number}
     */
    public readonly VERSION = 3;

    constructor() {}

    /// region Abstract Methods
    /**
     * The `getData()` method returns an object
     * that will be stored in the `data` field of
     * the underlying QR Code JSON content.
     *
     * @return {any}
     */
    public abstract getData(qr: QRCode): any;
    /// end-region Abstract Methods

    /**
     * The `toObject()` method returns a JSON object
     * with required fields.
     *
     * @return {any}
     */
    public toObject(qr: QRCode): any {

        // read data from child-classes
        const data = this.getData(qr);

        return {
            "v": this.VERSION,
            "type": qr.type,
            "network_id": qr.networkType,
            "chain_id": qr.generationHash,
            "data": data,
        };
    }
}

export {QRCodeDataSchema};
