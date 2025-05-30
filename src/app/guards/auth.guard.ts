import { CanActivateFn, Router } from "@angular/router";
import { AuthServiceService } from "../shared/data-access/auth-service/auth-service.service";
import { inject } from "@angular/core";
import { map } from "rxjs";

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthServiceService);
    const router = inject(Router);

    return authService.isAuthenticated.pipe(
        map(isAuth => {
            if (isAuth) {
                return true;
            } else {
                return router.createUrlTree(['/inicio']);
            }
        })
    )
}