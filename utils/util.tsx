const { v4: uuidv4 } = require('uuid');

export class Util {
    static get_url_extension( url: any ) {
        if( url == '' || url == undefined) return uuidv4() + ".png"
        return uuidv4() + "." + url.split(/[#?]/)[0].split('.').pop().trim();
    }
}