# CHANGELOG

## v0.9.0

- rebranded package to symbol-qr-library
- replaced deps to symbol-sdk and symbol-hd-wallets

## v0.8.0

- Updated upstream nem2-sdk@v0.17.0
- Updated upstream nem2-hd-wallets@v0.8.0
- Fixed public key generation tests
- Updated vulnerable dependencies

## v0.7.0

- Update sdk to v0.16.0

## v0.6.1

- Updated sdk to v0.15.0

## v0.6.0

- Updated dependency tree

## v0.5.3

- Using standard `qrcode` package
- Added `npm run build.browser`
- Fixed TransactionQR and MnemonicQR

## v0.3.0

- Added class `EncryptedPayload`
- Added class `EncryptionService`
- Added data schemas structure with `QRCodeDataSchema`
- Added data schema `AddContactDataSchema`
- Added data schema `ExportAccountDataSchema`
- Added data schema `RequestCosignatureDataSchema` child of Transaction data schema
- Added data schema `RequestTransactionDataSchema` child of Transaction data schema
- Unit tests for AccountQR, ContactQR, TransactionQR, CosignatureQR
- Modified QRCode.toJSON() logic to make use of `build()` method
- Fixed `AccountQR` generation of encrypted private keys for accounts
- Fixed `ContactQR` to also hold `name` information (optional)
- Fixed QR Code `TypeNumber`: ContactQR uses type 10, AccountQR type 20, TransactionQR type 40.
- Removed class `QRService`
- Removed encryption from `QRService` in `AccountQR`

## v0.2.0

- added QRcode base class
- added AccountQR Class
- added ContactQR Class
- added TransactionQR Class
- added ObjectQR Class

## v0.1.0

- added qr-library.
- generate QRcode by string.
- generate image base64 string by string.
