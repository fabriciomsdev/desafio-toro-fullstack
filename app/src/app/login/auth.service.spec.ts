import { TestBed, async } from '@angular/core/testing';

import { UserService } from '../login/auth.service';

import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppModule } from '../app.module';


class MockRouter {
  //noinspection TypeScriptUnresolvedFunction
  navigate = jasmine.createSpy("navigate");
}

describe('UserService', () => {
  let httpMock: HttpTestingController;
  let service: UserService;
  let mockRouter = new MockRouter();
  let testUserData = {
    name: "Fabricio Magalhães Sena",
    email: `fabricioms.dev@gmail.com`,
    password: "77991717025"
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, AppModule],
      providers: [{ provide: Router, useValue: mockRouter }]
    }).compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  })

  const tokenTest = 'asddhuweqw23124sdahjhdauwdsad';

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it("Test if save the token", () => {
    service.setToken(tokenTest);

    expect(service.getToken() === tokenTest).toBeTruthy();
  });

  it("Test if verify user is auth", () => {
    service.setToken(tokenTest);

    expect(service.isAuth()).toBeTruthy();
  });

  it("Test if routes url getter is working", () => {
    const service: UserService = TestBed.get(UserService);
    expect(service.getApiUrlResource("login")).toBe(
      `${environment.baseURLRequest}${environment.apiRoutes.login}`
    );

    expect(service.getApiUrlResource("register")).toBe(
      `${environment.baseURLRequest}${environment.apiRoutes.register}`
    );
  });

  it("Test if delete the token", () => {
    const service: UserService = TestBed.get(UserService);

    service.setToken(tokenTest);
    service.deleteToken();

    expect(service.getToken() == null).toBeTruthy();
  });

  it("Test if verify logout proccess is Ok!", () => {
    service.setToken(tokenTest);
    service.logout();

    expect(!service.isAuth()).toBeTruthy();
  });

  it("Test if user can register", () => {
    const service: UserService = TestBed.get(UserService);

    service
      .tryRegister(testUserData)
      .subscribe(user => {
        expect(user["email"]).toBe("fabricioms.dev@gmail.com");
        expect(user["password"]).toBe("77991717025");
        expect(user["name"]).toBe("Fabricio Magalhães Sena");
      });

    const req = httpMock.expectOne(
      `${environment.baseURLRequest}${environment.apiRoutes.register}`,
      "call login to api"
    );

    expect(req.request.method).toBe("POST");

    req.flush(testUserData);

    httpMock.verify();
  });

  it("Test if user can login", () => {
    const service: UserService = TestBed.get(UserService);
    const tokenAcess = "sdsahduweyuwqeadsghdsgdaysutdasd";
    const tokenRefresh = "sdsahduw4423rfsdasd";

    service.tryLogin(testUserData).subscribe(tokens => {
      expect(tokens["access"]).toBe(tokenAcess);
      expect(tokens["refresh"]).toBe(tokenRefresh);
    });

    const req = httpMock.expectOne(
      `${environment.baseURLRequest}${environment.apiRoutes.login}`,
      "call login to api"
    );

    expect(req.request.method).toBe("POST");

    req.flush({
      access: tokenAcess,
      refresh: tokenRefresh
    });

    httpMock.verify();
  });
});
