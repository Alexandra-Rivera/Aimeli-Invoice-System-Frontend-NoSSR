import { HttpEvent, HttpHandlerFn, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthServiceService } from "../shared/data-access/auth-service/auth-service.service";
import { inject } from "@angular/core";

export function AuthInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> {
    const authService = inject(AuthServiceService);
    const authToken = authService.getToken();

    if (authToken && !req.url.includes('/auth/login')) {
        const authReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${authToken}`,
            }
        });

        console.log("AuthReq:", authReq);
        return next(authReq);
    }
    return next(req);
}