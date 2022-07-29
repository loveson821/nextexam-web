import { randomUUID } from 'crypto'

export class Util {
    static get_url_extension( url: any ) {
        if( url == '' || url == undefined) return randomUUID() + ".png"
        return randomUUID() + "." + url.split(/[#?]/)[0].split('.').pop().trim();
    }
}