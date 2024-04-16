import { Injectable } from '@angular/core';
import { IResourceMethodObservable, Resource, ResourceAction, ResourceParams, ResourceRequestMethod, ResourceResponseBodyType, ResourceHandler } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IPreferences } from '../models/i-preferences';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/preferences`
})

export class SearchClientResourceService extends Resource {
  @ResourceAction({
    method: ResourceRequestMethod.Get,
    path: '/token/{!token}',
    responseBodyType: ResourceResponseBodyType.Json
  })
  getByToken!: IResourceMethodObservable<{token: string}, IPreferences>;


}
