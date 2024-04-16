import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ResourceModule } from '@ngx-resource/handler-ngx-http';
import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';  
import { SearchClientComponent } from './components/search-client/search-client.component';
import {createCustomElement} from "@angular/elements";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SearchClientComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    ResourceModule.forRoot(),
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [],
  entryComponents:[
    SearchClientComponent
  ],
  //bootstrap: [SearchClientComponent]
})
export class AppModule { 
  constructor(private injector : Injector){}
   ngDoBootstrap(){
       const buscador = createCustomElement(SearchClientComponent, {injector : this.injector});
       customElements.define('app-search-client', buscador);
   }
}
