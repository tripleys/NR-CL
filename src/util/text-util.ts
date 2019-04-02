export class TextUtil {

    static longForName(str: string): number {
        let l = 0;
        for(let i = 0; i < str.length && i < 12; i++) {
            let c = str.charCodeAt(i);
            l *= 37;
            if (c >= "A".charCodeAt(0) && c <= "Z".charCodeAt(0)) {
                l += (1 + c) - 65;
            } else if (c >= "a".charCodeAt(0) && c <= "z".charCodeAt(0)) {
                l += (1 + c) - 97;
            } else if (c >= "0".charCodeAt(0) && c <= "9".charCodeAt(0)) {
                l += (27 + c) - 48;
            }
        }
        for(; l % 37 == 0 && l != 0; l /= 37);
        return l;
    }

}