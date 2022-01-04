/**
 * (C) Symbol Contributors 2022
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
enum QRCodeType {
    AddContact = 1,
    ExportAccount = 2,
    RequestTransaction = 3,
    RequestCosignature = 4,
    ExportMnemonic = 5,
    ExportObject = 6,
    ExportAddress = 7,
    SignedTransaction = 8,
    CosignatureSignedTransaction = 9,
}

export {QRCodeType};
