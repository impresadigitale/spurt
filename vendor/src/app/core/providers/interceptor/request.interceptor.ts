import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {throwError, BehaviorSubject, Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class HTTPStatus {
  public requestInFlight$: BehaviorSubject<boolean>;

  constructor() {
    this.requestInFlight$ = new BehaviorSubject(false);
  }

  setHttpStatus(inFlight: boolean) {
    this.requestInFlight$.next(inFlight);
  }

  getHttpStatus(): Observable<boolean> {
    return this.requestInFlight$.asObservable();
  }
}
@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    protected userTokenDetail: any = {};

    constructor(private router: Router, private toastr: ToastrService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        this.userTokenDetail = localStorage.getItem('vendorToken') ? (localStorage.getItem('vendorToken')) : false;
        if (this.userTokenDetail) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.userTokenDetail}`
                },
            });
        }
        return next.handle(req).pipe(
            map((responsedata: any) => {
                if (responsedata instanceof HttpResponse) {
                    const response = responsedata.body;
                    if (response && response.message !== '' && req.method !== 'GET' && req.method !== 'POST') {
                        this.showNotificationSuccess('Success', response.message);
                    }
                }
                return responsedata;
            }),
            catchError(response => {
                switch (response.status) {
                    case 400:
                        this.handleBadRequest(response.error);
                        break;

                    case 401:
                        this.handleUnauthorized(response);
                        break;
                    case 502:
                        this.handleServerError502();
                        break;
                    case 422:
                        this.handleUprocessable(response.error);
                        break;
                    case 403:
                        this.handleForbidden();
                        break;

                    case 404:
                        this.handleNotFound(response);
                        break;

                    case 500:
                        this.handleServerError();
                        break;
                    case 409:
                        this.handleErrorMessages(response.error.meta);
                        break;
                    case 0:
                        this.handleServerError502();
                        break;
                    default:
                        break;
                }
                return throwError(response);
            })
        );
    }

    public handleServerError502() {
        this.router.navigate(['server-error']);
    }
    public handleDoc(response) {

    }
    handleUprocessable(response) {
    }
    /**
     * Shows notification errors when server response status is 401
     *
     * @params error
     */
    private handleBadRequest(responseBody: any): void {
            this.showNotificationError('', responseBody.message);
    }

    /**
     * Shows notification errors when server response status is 401 and redirects user to login page
     *
     * @params responseBody
     */
    private handleUnauthorized(responseBody: any): void {
        this.showNotificationError('', 'unauthorized');

    }

    /**
     * Shows notification errors when server response status is 403
     */
    private handleForbidden(): void {
        this.toastr.error('ServerError403', 'Error');
        this.router.navigate(['/auth/login']);
    }

    /**
     * Shows notification errors when server response status is 404
     *
     * @params responseBody
     */
    private handleNotFound(responseBody: any): void {
            const message = 'Page Not Found',
                title = '404';

    }

    /**
     * Shows notification errors when server response status is 500
     */
    private handleServerError(): void {
        const message = 'Internal Server Error',
            title = '500';

        this.showNotificationError(title, message);
    }

    /**
     * Parses server response and shows notification errors with translated messages
     *
     * @params response
     */
    private handleErrorMessages(response: any): void {
        if (!response) {
            return;
        }
        this.showNotificationError('Error', response.message);
    }

    /**
     * Returns relative url from the absolute path
     *
     * @params responseBody
     */
    private getRelativeUrl(url: string): string {
        return url.toLowerCase().replace(/^(?:\/\/|[^\/]+)*\//, '');
    }

    /**
     * Shows error notification with given title and message
     *
     * @params title
     * @params message
     */
    private showNotificationError(title: string, message: string): void {
        this.toastr.error(message, title);
    }

    /**
     * Shows success notification with given title and message
     *
     * @params title
     * @params message
     */
    private showNotificationSuccess(title: string, message: string): void {
        if (message === 'You successfully changed the notification read status') {
            return;
        }
        this.toastr.success(message, title);
    }
}
