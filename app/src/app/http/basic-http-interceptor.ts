import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { SharedModule } from '../shared/shared.module';
import { UserService } from '../login/auth.service';

@Injectable({
    providedIn: SharedModule
})
export class BasicHttpInterceptor implements HttpInterceptor {
    constructor(public authService: UserService) { }

    changeRequestHeaders(request: HttpRequest<any>): HttpRequest<any> {
        var requestHeader = request.headers;
        const token = this.authService.getToken();

        requestHeader = requestHeader.set('Accept', 'application/json');

        if (this.authService.getToken()) {
          requestHeader = requestHeader.set("Authorization", "Bearer " + token);
        }

        if (!request.headers.has('Content-Type')) {
            requestHeader = requestHeader.set('Content-Type', 'application/json');
        }

        return request.clone({ headers: requestHeader });
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = this.changeRequestHeaders(request);

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                return event;
            }), catchError((error: HttpErrorResponse) => {
                
                if (error.status == 401) {
                    this.authService.logout();
                }

                return throwError(error);
            }));
    }
}