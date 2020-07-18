import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import {MatSliderModule} from '@angular/material/slider';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {EditCustomerResolver} from './edit-customer/edit-customer.resolver';
import {FirebaseService} from './services/firebase.service';
import {MatIconModule} from '@angular/material/icon';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CreateCustomerComponent,
    EditCustomerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatIconModule,
    ToastrModule.forRoot(
      {
        timeOut: 2500,
        positionClass: 'toast-bottom-right',
      }
    )
  ],
  providers: [FirebaseService, EditCustomerResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
