import { QRCodeGenerator } from 'nem2-qr-library';

// (Optional) create transfer transaction (or read from network)
const transfer = TransferTransaction.create(
  Deadline.create(),
  Address.createFromPublicKey(
    'C5C55181284607954E56CD46DE85F4F3EF4CC713CC2B95000FA741998558D268',
    NetworkType.MIJIN_TEST
  ),
  [new Mosaic(new NamespaceId('cat.currency'), UInt64.fromUint(10000000))],
  PlainMessage.create('Welcome to NEM!'),
  NetworkType.MIJIN_TEST
);

// create QR Code base64
const request = QRCodeGenerator.createTransactionRequest(transfer);

// get base64 notation for <img> HTML attribute
const base64 = request.toBase64();