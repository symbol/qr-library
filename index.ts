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

import * as QRCodeSettings from './src/QRCodeSettings';

// enumerations / interfaces
export { QRCodeInterface } from './src/QRCodeInterface';
export { QRCodeType } from './src/QRCodeType';
export { CorrectionLevel, QRCodeSettings } from './src/QRCodeSettings';
export { QRCodeStreamType } from './src/QRCodeStreamType';

// abstract QRCode
export { QRCode } from './src/QRCode';

// QR Code data schemas
export { QRCodeDataSchema } from './src/QRCodeDataSchema';
export { AddContactDataSchema } from './src/schemas/AddContactDataSchema';
export { ExportAccountDataSchema } from './src/schemas/ExportAccountDataSchema';
export { ExportMnemonicDataSchema } from './src/schemas/ExportMnemonicDataSchema';
export { ExportObjectDataSchema } from './src/schemas/ExportObjectDataSchema';
export { RequestTransactionDataSchema } from './src/schemas/RequestTransactionDataSchema';
export { RequestCosignatureDataSchema } from './src/schemas/RequestCosignatureDataSchema';

// encryption
export { EncryptedPayload } from './src/EncryptedPayload';
export { EncryptionService } from './src/services/EncryptionService';

// specialized QR Code classes
export { AccountQR } from './src/AccountQR';
export { ContactQR } from './src/ContactQR';
export { ObjectQR } from './src/ObjectQR';
export { TransactionQR } from './src/TransactionQR';
export { CosignatureQR } from './src/CosignatureQR';
export { MnemonicQR } from './src/MnemonicQR';

// factory
export { QRCodeGenerator } from './src/QRCodeGenerator';
