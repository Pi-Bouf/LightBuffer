import {FourByteEmojis} from "../resources/four-byte-emojis";

describe('Test', () => {

    function encode(msg: string) {
        var octets = [];
        var length = msg.length;
        var i = 0;
        while (i < length) {
            var codePoint = msg.codePointAt(i);
            if(codePoint === undefined) return [];

            var c = 0;
            var bits = 0;
            if (codePoint <= 0x0000007F) {
                c = 0;
                bits = 0x00;
            } else if (codePoint <= 0x000007FF) {
                c = 6;
                bits = 0xC0;
            } else if (codePoint <= 0x0000FFFF) {
                c = 12;
                bits = 0xE0;
            } else if (codePoint <= 0x001FFFFF) {
                c = 18;
                bits = 0xF0;
            }
            octets.push(bits | (codePoint >> c));
            c -= 6;
            while (c >= 0) {
                octets.push(0x80 | ((codePoint >> c) & 0x3F));
                c -= 6;
            }
            i += codePoint >= 0x10000 ? 2 : 1;
        }
        return octets;
    };

    it('ok', () => {
        let textEncoder = new TextEncoder();
        let bytes = textEncoder.encode(FourByteEmojis[1]);


        console.time("1");
        for(let i = 0; i < 1000000; i++) {
            textEncoder.encode(FourByteEmojis[0]);
        }
        console.timeEnd("1");

        console.time("2");
        for(let i = 0; i < 1000000; i++) {
            encode(FourByteEmojis[0]);
        }
        console.timeEnd("2");
    })
});