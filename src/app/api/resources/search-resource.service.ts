import { Injectable } from '@angular/core';
import { IResourceMethodObservable, IResourceMethodObservableStrict, Resource, ResourceAction, ResourceParams, ResourceRequestBodyType, ResourceRequestMethod, ResourceResponseBodyType } from '@ngx-resource/core';
import { environment } from 'src/environments/environment';
import { IResults } from '../models/i-results';
import { ISearch } from '../models/i-search';

@Injectable({
  providedIn: 'root'
})

@ResourceParams({
  pathPrefix: `${environment.apiUrl}/search`
})

export class SearchResourceService extends Resource {

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/{!token}',
    requestBodyType: ResourceRequestBodyType.JSON,
    responseBodyType: ResourceResponseBodyType.Json
  })
  post!: IResourceMethodObservableStrict<ISearch, null, {token: string}, IResults>;

  @ResourceAction({
    method: ResourceRequestMethod.Post,
    path: '/popular/{!id}',
    responseBodyType: ResourceResponseBodyType.Json
  })
  popular!: IResourceMethodObservable<{id: string}, ISearch>;
}