import {expect} from "chai";
import { QrcodeGenerator } from "../index";
import * as conf from './conf/conf.spec';


describe('QR library Should', () => {

    it('be generated basic QR code with string', () => {
        const string = `NEM2 QR library.`
        let qr = new QrcodeGenerator(string).toQR();

        const expectedQR = [
            '█████████████████████████',
            '██ ▄▄▄▄▄ █ ▀█▀▄█ ▄▄▄▄▄ ██',
            '██ █   █ █ ▄ ▄ █ █   █ ██',
            '██ █▄▄▄█ █▀▄ █ █ █▄▄▄█ ██',
            '██▄▄▄▄▄▄▄█▄█▄▀ █▄▄▄▄▄▄▄██',
            '██  ██▄▄▄▀▀██▄█▀█▄▀    ██',
            '██ █  ▄▄▄█▀██▄█ █▀ ██▄▀██',
            '████▄▄▄█▄▄ ▀█▀█ ▀▄ ▀▄▀▀██',
            '██ ▄▄▄▄▄ █▀▀▀▀▀▀▄▀▄▀█▄▀██',
            '██ █   █ █▄█▄▀▄▀▀▀█▄▀▀▀██',
            '██ █▄▄▄█ █▀▀▀██▀▄█ ▄▄████',
            '██▄▄▄▄▄▄▄█▄█▄█▄▄███▄▄█▄██',
            '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
        ].join('\n');

        expect(qr).to.deep.equal(expectedQR);
    });

    it('be generated QR code in data string format(data:image/gif;base64) with string', () => {
        const string = `NEM2 QR library.`
        let base64 = new QrcodeGenerator(string).toImgBase64();

        const expectedBase64 = `data:image/gif;base64,R0lGODdhcwBzAIAAAAAAAP///ywAAAAAcwBzAAAC/4yPqcvtD6OctNqLs968+w+G4kiWF4Cm6sq2bbJOMeLWtuvcug6rsk/bCV+NoRF4mEWUhqMz5zT2Uj9qMCqEYndTVNV73d604A0zYOsCyGvOWd05p8NtxvuEXNwt8hq8mJex1xSI0YdDxxZXmOgWOJfEGGllJklIecnTOCn2xzm2qfeYFYomVpZZlwqZqkjHaooZ21k65Ckqa1t7qjrbq/vp+gl7SBv86ld660s8muuM6qvWLLsM3Lr7rB19LQ24DXosjj3uPZxcbk1aXvwL7c6lnK3J/q4OTh19T0+OS1SPD10/Be3y9Zpmb164gfsWmvPHoiFCROkUGmTTruHFb//c1jFEBk6jwIcELVHIqHCZIZODTiYE2LEaHpkV+bwciLISzY82Q6aU11Mf0Ao5cd4UxJLXRpjwlP6D6PRoUWZRhZ6rKtFi1YMgo2ZlupXrVa8/wW41MQIW2rUh1LJ964gi3Lk6n9K9GzQi3pJy+fJzudNvUykc9drxCNgqxIl/GYtdNfLLY8GO3Y6d3E2y5q4OHWOMLKGlyHiH+640HTrpqc+BJYsuzPpI7MmuTQqDGmX2ItRLVBvD3To1bwgtld6m+mRmTMUkVcLmnFn4csy+aWtNntd5TZ6LoSPevL35UMreSRM9qp07+cunmR+33L309Nfyrdf3LJ16wOD3lQ//pq9eQbY9lx1n4MUHGX8IJvbfgOHNJuBwD0Q4nQjdRNfbfhW2hRiGxL0z1W5/eTghiOjFNeJ3+eH34F4sGtWXQQCutVSC85moII0jUdighvaxVSNyN/ro4oskyYgjc2HN2N5gx0HIC1ohjldZlCZM2eJlxl15YpY2OiVll+qlx2CV2MGoZHUi9vjbkWoSqAGPWHy1IJkHCrkFnevV6Z+ZspXFp1kxSiVmiTm+1yGhPhVYF5uGoekklXAi5eNUljoY6HmVKrqhl3tSOqRdTF5nl5/6hfqoeBmiWpyKgoqK6ackzppkqqO+mqqpiJqn6oebBkbrr52SIGeso8F6aJ/lb7k36YXGKqvls7hi+UGxyU5b6Jq6Qhtnra0CK62vzK7q6LdpXivuj4ay+mZ/INy6YLDnjqspveuW226moC6pJ3yCUYvnlkwZqdt4S3LqaG2LAkfWwAbmB/DBC7spoZHwFolxxhpvzHHHHn8McsgFAAA7`;

        expect(base64).to.deep.equal(expectedBase64);
    });

    it('be generated from add_contract json string for schema 1', ()=>{
        let base64 = new QrcodeGenerator(conf.ADD_CONTRACT).toImgBase64();
        let qr = new QrcodeGenerator(conf.ADD_CONTRACT).toQR();

        const expectedBase64 = `data:image/gif;base64,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`
        const expectedQR = [
            '█████████████████████████████████████████████',
            '██ ▄▄▄▄▄ ███▄▀▀▄███  █▄ ▄█▀█ ▄▀▄████ ▄▄▄▄▄ ██',
            '██ █   █ █▀▀▄▀ ██ ▄▀  ▄▄▄ ██▄ ▀█▄█▄█ █   █ ██',
            '██ █▄▄▄█ █▄▄█▄▄█▀▄▄▀ █▄▄▀▄  ▀██▀█▄██ █▄▄▄█ ██',
            '██▄▄▄▄▄▄▄█▄▀ █ █▄▀▄█ ▀ █ █▄█▄▀ █▄▀ █▄▄▄▄▄▄▄██',
            '██▄ ██▀ ▄ █  ▄█▄▀ █ ▄▀█▀  ▄█▄▄█▄▀▀▄▀██ ▄▀█▀██',
            '███   █▀▄▄▄▄▄ ▀▄▀▄ ██▀ ██▀ █▄▄▄█▀█  ▀█▀▀▄ ▀██',
            '██ ▄█ ▄█▄▀▄▄▀▄▄█ ▄  ▀█▀ █▄▄ █▄▀▀▄▄▀▀ ▀▀█▀▄▀██',
            '██▄▀ ▀▀ ▄▄ ▀▄ ▄▄▀▄▄▄ ██▄▄██▄▄▄▀▄█▀▀▄▄  █ ▄███',
            '████▄▀ █▄█▀▄  ▄▄█▀ ▄ ▀▀  ▀ █▄▄▀▄█▀▀ ▀█▀█▄  ██',
            '██ ▄ ▀▀▄▄▄█ █▄▄█▄▄▄█ ▄██▄  ▄ ▄▀█▄    █ ▀██ ██',
            '██▀  █▄▀▄ ▀ ██  ▀ ▀█▀    ▄█ ██▄▄ ▄█▄█▀▀█ ▄ ██',
            '██▄ ▄  █▄█ ▀▄███▄▄ ▄ ▀▀█ ██▄▄  ▄ ▀▄ ██▀▀▄ ▀██',
            '██▄▄▀▄ █▄▀▄▀▀▀█▄▄ ▀ ▀▀ ▀▀█ ▄█▄ ▀▀  ▄  ▀▄█ ▀██',
            '██  ▄▀▄█▄▀█▀██▀▄▀▄ ▄▄▀ ▄▀█▄▄▀ ▀██▀▀▄█ ▄  ▄███',
            '██▀█▀▄▄▄▄▄██ ▀█▀█▄ █▀█▀██  █ ▄▀ ▄█  ▀ ▀█▄ ▀██',
            '██ ▄▄  █▄█ ██  █▄ ▀█▄ ▀██▄█▄▀ ▄█▄ ▄██  ▀▄▀▄██',
            '██▄█▄█▄▄▄█▀██ ▄ ▀▀█▄▀ ▄▀   █▄ ▀▄ █ ▄▄▄ █▄████',
            '██ ▄▄▄▄▄ █ ▀██▄▄█▄▀██▀█▄ ▀ ▄▀ █▄ ▄ █▄█ ▀█ ███',
            '██ █   █ ███▄▄ █▀▄ ▄▀▄ ▄▀▄▄▄▀▀█▄█▄ ▄▄▄▄ █▄▄██',
            '██ █▄▄▄█ █▀ ███▄▀▄ █▄▀▄▄▄▀██  █▄ █▄▄█  ▀▀▄ ██',
            '██▄▄▄▄▄▄▄█▄█▄▄▄▄▄█▄▄██▄█▄█▄▄█▄▄▄▄██▄▄▄▄█▄████',
            '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
        ].join('\n');

        expect(qr).to.deep.equal(expectedQR);
        expect(base64).to.deep.equal(expectedBase64);
    });

    it('be generated from transaction json string for schema 2', ()=>{
        let base64 = new QrcodeGenerator(conf.TRANSACTION).toImgBase64();
        let qr = new QrcodeGenerator(conf.TRANSACTION).toQR();

        const expectedBase64 = `data:image/gif;base64,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`
        const expectedQR = [
            '█████████████████████████████████████████████████████████████',
            '██ ▄▄▄▄▄ █▄▀███  ▀█ █▄▀ █  ▀█▄▄  █▀▄█ ▀▄█▄▄  ▀▀█▄ ██ ▄▄▄▄▄ ██',
            '██ █   █ █ ▀█ ▀▀▄██▀▀▀ ▀▄▀█▄▀ █▀▄ ▄▄▄ ▀▄▀█▄ ▄▀▄█▄ ██ █   █ ██',
            '██ █▄▄▄█ █▄▄▀█ █▄▀▀██  ▄▄▀█▀ ▄▄▄ ▄▄ █▀█▀ █ ▀██▄▀▀▄██ █▄▄▄█ ██',
            '██▄▄▄▄▄▄▄█▄▀▄█ ▀ █▄▀ █▄█▄█▄▀ █▄█ ▀▄█ █ █▄█▄▀▄▀▄▀ █▄█▄▄▄▄▄▄▄██',
            '██▄▄▄ █▀▄▀ █▄▄▀▀███▄█▀▄    █▄  ▄ ▀█▀███▄▄█   ▀▀ ▄   █▀ ▄▄▀ ██',
            '██ ▀▀█ █▄█▄██   ▀▀ ▀▄▀█▀█▄ ▄█▀█▄▀█   ▄▀█▀█▄ ▄▀▄█  █▄▀▄▄█▄  ██',
            '██ █▄▀ ▄▄▀▄ ▀▀█▄ ▀█▀▄ ▀▀▀▄▄█▄█▀▄▄▄█▄█▄  ▀▄▀▄█ ▀▄▄ █ ▀██▀ ▄ ██',
            '██ ▄▄▀▄ ▄▄█ ▀▀█ █ █▄▀▀▄█ ▀▀▄▄▀ ▀▄  ▀▀▀█ █▀ █▄  ▀██▄█▀█▀█ ▀███',
            '███▄██  ▄ ▄▀ ▄█▄   ▄▀██▄█▄▄▀▀█▀▀█▄▄█ █▀█▄██▀█▄ ▀ ▀█▀███  ▄ ██',
            '██▄▄█ ▄▄▄ ▀▀  ▄▀▀ █   ▀ ▀▀▀█ █▀  █▄ ▄▀█▀▄▄ ██▀█▄▄▀▀  ▄▀▀▄████',
            '███▄▄▄ ▄▄ █  ▀█ ██ ██▄█▀ ▀ ▄ ▀▄ ▀█▀█▄▄█▄█▀ ▄▀▀█▀█ ▀▀█▀▄   ▀██',
            '████▀▄▀█▄▄ █▄▀ ██▀▄▀█▀█ ▀▀▀▀█▄█▄  ▀▄ █ ▀▄▀▄▄▄▄ ▀▄ █▀██▄ █▄ ██',
            '██ █▀▄▄▄▄▄▀▀  ▀▄ ▀▄  █ █▀ ██▄▄█▀█▄▀███▄▀ █▀▄▄ ▀▄█▄▄  ▀█▀▀█▄██',
            '███▀█▄ ▄▄▄ ██▀█▀█  █▄▄ █  █  ▄▄▄ ▄█▀█ ██▄█▀▀▄███ ▀ ▄▄▄ █ ▀███',
            '██▀▄ ▄ █▄█ ▀██▄█▄ ▀▀▀█▄▄██▄█ █▄█ █ █ ▀▀▄▄▀█▀▄▄▄█▀▄ █▄█ ▄▄█▄██',
            '███▄█▄▄▄▄▄▄▄█▀█ ▀▄▄▀ █  ███▄  ▄  █▄▄▄█ █▀▄█▄▀▄█▄█▄▄▄▄▄▄██ ▀██',
            '██ █ ▄▄▀▄█▀  █▀█▀▄███▀▄▄ ▄ ██▄█▄ ▀▀████▀█▀▄  ▀█▄▄▀▀▀▀██▄▀█ ██',
            '███ ▀▄▄▄▄▀█▄ █▀ ▀█ ▀▄▀▄  ▄▄▀▀ ▀█▀▀ ▄ ▄█ ▀ ▄  ▀ ▀▄▄█ ▄▄ ▀▄█▄██',
            '██▀▄ ▀▀ ▄ ▀█▄ ▄▄▄▄█ ▄█  ▀██▄▀ ▄▄▀▄██▄▄ █ ▄▀▄▄▄█▀█▀▀▀▀▄▄▀ ▄▀██',
            '██▀▀█▀▀▄▄ █▀▀▀▀▄█▄ ▄ ▀█▄█▄██▄ ▄ █ ▀█▀▄▄ ▄█ ▀▀█ ▀   ▄█   ▀ ███',
            '██▀▀▀▄▄▄▄▀█▄██▄  ▀ █▀▀▄██ ▄ ▄▀ ▀█  █▀███▄██▀▄▄▄█  ▀▄█▀▀█▄▀ ██',
            '██  ▀▀▄▄▄   █▀▀▄  █▄█▀█ █▄▄  █▀  ▀▀ ▀█ ▄▄▄█▀█▄ ▄ ▄▀▄█▄ ██ ▀██',
            '██▀▄ █▄█▄▀▄▀▀█▀ █ ██▀█▄   ▀█ ▄████▀▀▄ ▀▀█ ▄▀ ▀▀▀██▄█▀██  █▀██',
            '██ ▀ ▀▀▄▄▄▄████▀▀▄▀█▄██▄▀▄▄ █▀▄█▀▀▀█▀▄▀█▄██  ▀▀▀▄ █  █  ██▄██',
            '████████▄▄   ▄ ▄ ▄▄▀▄  █▀▀█▀ ▄▄▄  ▀ ▄█▄▀▀▄▀▀█ █ ▄█ ▄▄▄  ▀▄▄██',
            '██ ▄▄▄▄▄ ███ █  ▄▀▀▄▀██▀ ▀▄█ █▄█ █▀▀█▀▀▄▄▀ █ ▄▀ ██ █▄█ ▀ ████',
            '██ █   █ █▀ █ ███  ████ ▀▀▄ ▄▄▄  ▀ █ █▀██▀█ ▄  ▀   ▄ ▄▄ █▀▄██',
            '██ █▄▄▄█ █ ▀▀▀█▀ ▄ █▄  ▄▀▄ ▄▄█▀▄██▄█ ▄▀█▄▄ ▄▄██▄█    ▀▀█▄█▀██',
            '██▄▄▄▄▄▄▄█▄████▄█▄█▄█▄▄█▄█▄██▄▄█▄▄███▄████▄▄██████▄▄██▄▄▄████',
            '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
        ].join('\n');

        expect(qr).to.deep.equal(expectedQR);
        expect(base64).to.deep.equal(expectedBase64);

    });

    it('be generated from export account json string for schema 3', ()=>{
        let base64 = new QrcodeGenerator(conf.IMPORT_EXPORT_ACCOUNT).toImgBase64();
        let qr = new QrcodeGenerator(conf.IMPORT_EXPORT_ACCOUNT).toQR();

        const expectedBase64 = `data:image/gif;base64,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`
        const expectedQR = [
            '█████████████████████████████████████████████████████',
            '██ ▄▄▄▄▄ █▀ ▀▄▀   ▀ ▀▄▀█▀▄ ▀▀██▄▄▀█▄▀█▀▄▀▀ █ ▄▄▄▄▄ ██',
            '██ █   █ █▀█▀██▀ ▀█▄ █▀ ▀▀▀ ██▄▀▄ ▄▀█  ▀█ ▄█ █   █ ██',
            '██ █▄▄▄█ █▀▀ █▀▀█▄█▄█▄▀  ▄▄▄  █▄▄█▄ ▀  ▄▀███ █▄▄▄█ ██',
            '██▄▄▄▄▄▄▄█▄▀▄▀ ▀ █ ▀ ▀▄█ █▄█ █ █ █ █▄█▄█ ▀▄█▄▄▄▄▄▄▄██',
            '██▄ ▄▄ ▀▄▄ ████▀▀▀▄ ▄ ▄█▄▄  ▄▄██▀ ▀▄█   █▀▄ ▀ ▀ █▄███',
            '██ ▀ ▀  ▄█▀ █▄ ▀█ ▄▀▄▄▄▄██▄▀▄▄ ▄█▀▀ ▄▄ █ ▀▄▀██▀█▄  ██',
            '██▀▀▀ ▀▀▄▀  ▄▀█▀██▄▀▄▄▄ ▄▄ █▄██   █ ▄▄▄▄▄█▄█ ▀▀ ▄▀▄██',
            '███▄▄▄ ▀▄ █▄ ▀ ▀█  █ ▄█ ▄ ▄  ▄▀██ ▀▄▄ ██▄█ █ ▀▀▀▄▄▄██',
            '██  █▄██▄ ▀▄▄▄█▀▀ ▄ ▄▀▄▀▄▀▄▀█ ▀  ▀▀ ▄▀▄▀▄▄▄  ▄▀▀▄▀▄██',
            '███ ▄▀▄▀▄▀▀▄█▀█▄   ▀▀▀ ▀██▄▄ ▀▀▀█▄▀█ ▄ █▄▄▄██▀▀█▄█ ██',
            '██ ▄▄▀▄ ▄█ ▀▀ █▄▄ █▀▄▄▄▄▄▄▄▄█▀█ ▀▄▀ █ ▄█▄▄▄█▀█▀▄▄████',
            '██▀▄▄  ▄▄▄ █ ▄ ▄██▀▄ ▄█  ▄▄▄ ▀▀█▀ ▀ █ █▄▄█ ▄▄▄  ▄█▄██',
            '██▄▀▀  █▄█ ▄ ▀█▄▀▀▄▄▄▀▄▄ █▄█ ███▀█▀▀▄█ ▄█▀ █▄█ ▀ ▀███',
            '██▄█   ▄▄ ▄▀▀██▀█ ▄█▄ █▀▄▄   █▀ █▀▀▀   ▄ █▄▄▄▄ ▄█▀▄██',
            '██▀▀▄█▄ ▄█▀█ █ ▀██▄▀▄▄▄▀█▀▀▄████▀ ▀ ▄▄▄█▄▄█▄▀█▄▄▄█ ██',
            '██ ▀  ▄▀▄▀▄█▀█▄▀▀    ██▀▀ ▀█▀ ▀▀▀   ▄▄██▄▄  ▄█ ▀█▀▄██',
            '███▄ █▄█▄███▄▀▀▀▀ ▄▄▄▀▄ ▀█▀ ███▀▀▀▀ ▄ ▄▀█ ▀█▄▄▄█▄████',
            '██▄  █▀▄▄ ▀▄▄▄▀▄ ▀▀▀▄█▄█▀██▀▀ ▀█▀ █▀▄█ █▄▄█▄▄█▄██  ██',
            '███▄▀▄█▀▄▀▄  ▄ ▄▄ █▄▄▄▄▀█▄▀█▀█▀█▀ █▄▄  ▀▄▄█▄ ██▄▄▀███',
            '███ ▀▀█▄▄ ▄ ▄▄ █▀ ▄▄ ▄█▀ ▄▄█▀ ▀ ▀   ▄█████ █▄▀▀ ▄▄ ██',
            '██▄▄▄███▄▄▀ ▄▄▀▀▀█▄▄ █▄▀ ▄▄▄ ███▀██▀▄ ▄▄▄▄ ▄▄▄ ▄ ▀███',
            '██ ▄▄▄▄▄ █▄█▄▄▀▀███▄ █ ▀ █▄█ ▀█▄█▄▀█ █   ▄ █▄█ ███ ██',
            '██ █   █ █ █ ▀▄▀█ ▄▀▄▄▄▀ ▄ ▄▄▀▀█▀ █▄▄   █▄  ▄▄  ▄▀███',
            '██ █▄▄▄█ █ ▀▀▀██▀▀█▀█ █▄ █ ▄█▄▀██ ▀  ▀▄▀█ ▀▀▀▀█ ▄█▀██',
            '██▄▄▄▄▄▄▄█▄█▄██▄█▄▄▄▄██▄█▄█▄▄▄█▄▄█████▄██▄█████▄▄▄▄██',
            '▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀'
        ].join('\n');

        expect(qr).to.deep.equal(expectedQR);
        expect(base64).to.deep.equal(expectedBase64);
    });
});
