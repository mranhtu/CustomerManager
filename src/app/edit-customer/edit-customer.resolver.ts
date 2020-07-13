import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {FirebaseService} from '../services/firebase.service';
import {Injectable} from '@angular/core';


@Injectable()
export class EditCustomerResolver implements Resolve<any> {

  constructor(public firebaseService: FirebaseService) { }

  resolve(route: ActivatedRouteSnapshot, ) {

    return new Promise((resolve, reject) => {
      const userId = route.paramMap.get('id');
      this.firebaseService.getUser(userId)
        .subscribe(
          data => {
            resolve(data);
          }
        );
    });
  }
}
