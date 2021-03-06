import {Directive, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {ProfileService} from '@shared/services/profile.service';
import {Router} from '@angular/router';
import {Profile} from 'model/Profile';
import {Observable} from 'rxjs';
import {AuthService} from '@shared/services/auth.service';
import {map} from 'rxjs/operators';

@Directive({
    selector: '[appOnlyAdmin]'
})
export class OnlyAdminDirective implements OnInit {

    constructor(private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private authService: AuthService,
                public profileService: ProfileService,
                private router: Router) {
    }

    ngOnInit(): void {
        this.authService.loggedIn().then(isLogged => {
            if (isLogged) {
                const profile = this.profileService.getProfileFromLocal();
                this.checkPermission(profile).subscribe(approval => {
                    if (!approval) {
                        this.router.navigate(['unauthorized']);
                    }
                });
            } else {
                this.router.navigate(['unauthorized']);
            }
        });
    }

    checkPermission(profile: Profile): Observable<boolean> {
        return this.profileService.getAdminUsers().pipe(map( x => {
            if (profile.userId !== null && x['users'].indexOf(profile.userId) > -1) {
                this.viewContainer.createEmbeddedView(this.templateRef);
                return true;
            }
            this.viewContainer.clear();
            return false;
        }));
    }
}
