import uuid from 'react-uuid'

export class Util {
    static get_url_extension( url: any ) {
        if( url == '' || url == undefined) return uuid() + ".png"
        return uuid() + "." + url.split(/[#?]/)[0].split('.').pop().trim();
    }
}