import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: "root"
})
export class RestFullApiBaseService {
  apiPaths = environment.apiRoutes;
  resourceUrlInApi: string;
  baseUrl: string = environment["baseURLRequest"];
  resource: string;
  routeUrlParams;

  constructor(protected http: HttpClient) {}

  setResource(resource) {
    this.resource = resource;
    this.resourceUrlInApi = this.apiPaths[resource];

    return this;
  }

  public builderUrl(complement?: any) {
    let requestUrl = `${this.baseUrl}${this.resourceUrlInApi}`;

    if (complement) {
      requestUrl += `${complement}/`;
    }

    return requestUrl;
  }

  public setHeader() {
    const token = localStorage.getItem('token');
    var headers: any = {
      "Content-Type": "application/json"
    };

    if (token) {
        headers.Authorization = "Bearer " + token;
    }

    return new HttpHeaders(headers);
  }

  public fetch(params?: any, complement?: any) {
    var data = new HttpParams();

    if (params) {
      for (let name in params) {
        if (params[name]) {
          data = data.append(name, params[name]);
        }
      }
    }

    var options = {
      headers: this.setHeader(),
      params: {}
    };

    if (params) {
      options.params = data;
    }

    var url = "";

    if (complement) {
      url = this.builderUrl(complement);
    } else {
      url = this.builderUrl();
    }

    return this.http.get(url, options);
  }

  public find(id: number) {
    return this.fetch(null, String(id));
  }

  public post(data: any, complement?: string) {

    return this.http.post(
      this.builderUrl(complement),
      data,
      { headers: this.setHeader() } 
    );
  }

  public put(data: any, id: number) {
    const headers = { headers: this.setHeader() } ;
    const url = this.builderUrl(String(id));
    data._method = "PUT";

    return this.http.put(url, data, headers);
  }

  /*
  public patch(data: any, id: number) {
    const headers = { headers: this.setHeader() } ;
    const url = this.builderUrl(String(id));
    data._method = "PATCH";

    return this.http.patch(url, data, headers);
  }*/

  public options() {
    const headers = { headers: this.setHeader() } ;
    const url = this.builderUrl();

    return this.http.options(url, headers);
  }

  public delete(id: number) {
    return this.http.delete(
      this.builderUrl(String(id)),
      { headers: this.setHeader() } 
    );
  }
}