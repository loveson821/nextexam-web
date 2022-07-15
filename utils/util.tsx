import uuid from 'react-uuid'

export class Util {
    static get_url_extension( url: any ) {
        if( url == '' || url == undefined) return ""
        return uuid() + "." + url.split(/[#?]/)[0].split('.').pop().trim();
    }
}