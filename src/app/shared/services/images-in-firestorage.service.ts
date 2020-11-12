import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class ImagesInFirestorageService {

  constructor( 
    private afs: AngularFireStorage
    ) { }

  
  uploadImage(image : File, pathInStorage : String ) : AngularFireUploadTask {
    const filePath = this.afs.ref(pathInStorage + '/' +  uuidv4());
    const task = filePath.put(image);

    return task;
  }

  downloadImage(path : string) : Observable<any> {
    const ref = this.afs.ref(path);
    return ref.getDownloadURL();
  }
  
  getFullUrlToPhoto(path : string) : Promise<string>  {
    let resUrl = "";
    
    return new Promise<string>((resolve, reject) => {
      if(path === null || path === undefined || path === ""){
        resolve('https://i.pinimg.com/originals/8a/eb/d8/8aebd875fbddd22bf3971c3a7159bdc7.png')
        return;
      } 
  
      if(path.startsWith('https') || path.startsWith('http')) {
        resolve(path);
      }
      else {
        console.log("In downloadnImage:" + path);
        this.afs.ref(path).getDownloadURL().subscribe(val => {
          resolve(val);
        })
      }
    })
   }
}
