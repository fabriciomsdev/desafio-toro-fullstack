import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';
import { RestFullApiBaseService } from './api-base.service';
import * as moment from 'moment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

describe('RestFullApiBaseService', () => {
  let service: RestFullApiBaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(RestFullApiBaseService);
  })

  it('should be created', () => {
    const service: RestFullApiBaseService = TestBed.get(RestFullApiBaseService);
    expect(service).toBeTruthy();
    expect(service.http instanceof HttpClient).toBeTruthy();
    expect(service.resourceUrlInApi == null).toBeTruthy();
    expect(service.routeUrlParams == null).toBeTruthy();
    expect(service.resource == null).toBeTruthy();
    expect(service.apiPaths == environment.apiRoutes).toBeTruthy();
    expect(service.baseUrl == environment.baseURLRequest).toBeTruthy();
  });

  it("test url resources was init correct", () => {
    const service: RestFullApiBaseService = TestBed.get(RestFullApiBaseService);
    service.setResource('login');

    expect(service.setResource('login') instanceof RestFullApiBaseService).toBeTruthy();
    expect(service.resourceUrlInApi == environment.apiRoutes.login).toBeTruthy();
    expect(service.resource == "login").toBeTruthy();
  });

  it("test http methods", () => {
    expect(service.delete(1) instanceof Observable).toBeTruthy();
    expect(service.post({}) instanceof Observable).toBeTruthy();
    expect(service.put({}, 1) instanceof Observable).toBeTruthy();
    expect(service.fetch() instanceof Observable).toBeTruthy();
    expect(service.options() instanceof Observable).toBeTruthy();
    expect(service.fetch({}, '') instanceof Observable).toBeTruthy();
  })

  it("test methods", () => {
    expect(service.setHeader() instanceof HttpHeaders).toBeTruthy();
    expect(service.setResource('orders') instanceof RestFullApiBaseService).toBeTruthy();
    expect(service.put({}, 1) instanceof Observable).toBeTruthy();
    expect(service.fetch() instanceof Observable).toBeTruthy();
    expect(service.fetch({}, '') instanceof Observable).toBeTruthy();
  })

  it("test url builder", () => {
    service.setResource("login");
    const rightUrl = `${environment.baseURLRequest}${environment.apiRoutes.login}`;
    
    expect(service.builderUrl() == rightUrl).toBeTruthy();
    expect(service.builderUrl(1) == `${rightUrl}1/`).toBeTruthy();
  })

  it("test set headers", () => {
    const header = service.setHeader();
    expect(header.get("Content-Type") != null).toBeTruthy();

    localStorage.setItem("token", '213612631221783');
    const headerWithToken = service.setHeader();
    expect(headerWithToken.get("Authorization") != null).toBeTruthy();
    localStorage.removeItem("token");
  });
});

describe("RestFullApiBaseService > Test post flow", () => {
  let httpMock: HttpTestingController;
  let service: RestFullApiBaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(RestFullApiBaseService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it("post()", () => {
    service.setResource("operations");
    const operationTest = {
      id: null,
      value: 600,
      type: "draw",
      created_at: moment().toNow()
    };

    const request = service.post(operationTest);

    expect(request instanceof Observable).toBeTruthy();

    request.subscribe(operation => {
      expect(operation["value"]).toBe(operationTest.value);
      expect(operation["type"]).toBe(operationTest.type);
      expect(operation["created_at"]).toBe(operationTest.created_at);
      expect(operation["id"] != null).toBeTruthy();
    });

    const req = httpMock.expectOne(
      `${environment.baseURLRequest}${environment.apiRoutes.operations}`,
      "Test post flow of generic api base"
    );

    expect(req.request.method).toBe("POST");

    operationTest.id = 1;

    req.flush(operationTest);

    httpMock.verify();
  });
});

describe("RestFullApiBaseService > Test Fetch flow", () => {
  let httpFetchMock: HttpTestingController;
  let service: RestFullApiBaseService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(RestFullApiBaseService);
    httpFetchMock = TestBed.get(HttpTestingController);
  });

  it("fetch()", () => {
    httpFetchMock = TestBed.get(HttpTestingController);
    service.setResource("operations");

    const operationsListTest = [
      {
        id: 1,
        value: 10000,
        type: "draw",
        created_at: moment().toNow()
      },
      {
        id: 1,
        value: 10000,
        type: "draw",
        created_at: moment().toNow()
      },
      {
        id: 1,
        value: 10000,
        type: "draw",
        created_at: moment().toNow()
      }
    ];

    console.log(
      service.builderUrl(),
      `${environment.baseURLRequest}${environment.apiRoutes.operations}`
    );
    service.fetch().subscribe((operations: Array<any>) => {
      expect(operations.length > 0).toBeTruthy();
    });

    const req = httpFetchMock.expectOne(
      `${environment.baseURLRequest}${environment.apiRoutes.operations}`,
      "Test fetch flow of generic api base"
    );

    console.log(req.request.method);

    expect(req.request.method).toBe("GET");

    req.flush(operationsListTest);

    httpFetchMock.verify();
  });
});