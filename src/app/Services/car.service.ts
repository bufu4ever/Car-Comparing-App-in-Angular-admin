import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize, Observable } from 'rxjs';
import { Car } from '../car';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  constructor(private firestore: AngularFirestore, private storage: AngularFireStorage) {}

  getCars(): Observable<Car[]> {
    return this.firestore.collection<Car>('cars').valueChanges({ idField: 'id' });
  }

  getCar(id: string): Observable<Car> {
    return this.firestore.collection<Car>('cars').doc(id).valueChanges();
  }

  addCar(car: Car, image: File | null): Observable<void> {
    if (image) {
      const filePath = `cars/${Date.now()}_${image.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, image);

      return new Observable((observer) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              car.imageUrl = url;
              this.firestore.collection('cars').add(car).then(() => observer.next()).catch(err => observer.error(err));
            });
          })
        ).subscribe();
      });
    } else {
      return new Observable((observer) => {
        this.firestore.collection('cars').add(car).then(() => observer.next()).catch(err => observer.error(err));
      });
    }
  }

  updateCar(car: Car, image?: File): Observable<void> {
    if (image) {
      const filePath = `cars/${Date.now()}_${image.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, image);

      return new Observable((observer) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              car.imageUrl = url;
              this.firestore.collection('cars').doc(car.id).update(car).then(() => observer.next()).catch(err => observer.error(err));
            });
          })
        ).subscribe();
      });
    } else {
      return new Observable((observer) => {
        this.firestore.collection('cars').doc(car.id).update(car).then(() => observer.next()).catch(err => observer.error(err));
      });
    }
  }

  deleteCar(id: string, imageUrl: string): Promise<void> {
    const imageRef = this.storage.refFromURL(imageUrl);
    return this.firestore.collection('cars').doc(id).delete().then(() => {
      return imageRef.delete().toPromise();
    });
  }
}

export { Car };
