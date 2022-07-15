import {
  ref,
  uploadBytesResumable ,
  getDownloadURL ,
  uploadString
} from "firebase/storage";
import storage from '../../firebase.js'

export class UploadFileApi {
  static uploadFile = async (file: any, path: string): Promise<string> => {
    if (!file) return "";
      if( path == '' || path == undefined || path == null ) path = "web_uploads";
      const storageRef = ref(storage, `${path}/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      var mDownloadUrl = ""
      await uploadTask.on(
        "state_changed",
        (snapshot) => {
            const percent = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            );
  
            // update progress
            // setPercent(percent);
            console.log(percent);
            
        },
        (err) => console.log(err),
        async () => {
            // download url
            mDownloadUrl = await getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url);
                return url
            });
            return mDownloadUrl
        }
      );
      return mDownloadUrl
    }
}