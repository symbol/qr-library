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
    NetworkType,
} from 'nem2-sdk';

// internal dependencies
import {
    ContactQR,
    QRCodeType,
} from '../index';

// Arrange
const contactInfo = {
    v: 3,
    type: QRCodeType.AddContact,
    network_id: NetworkType.MIJIN_TEST,
    chain_id: 'no-chain-id',
    data: {
        name: 'nemtech',
        address: 'SDUFICQAIHN2VYORJILRQ5YXAERLJF5HDTPJNXVR'
    }
};

// create QR Code with JSON content
const contactQR = ContactQR.fromJSON(JSON.stringify(contactInfo));

console.log(contactQR.toASCII());
