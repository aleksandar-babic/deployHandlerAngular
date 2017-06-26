import { Http, Response, Headers } from "@angular/http";
import { Injectable, EventEmitter } from "@angular/core";
import 'rxjs/Rx';
import { Observable } from "rxjs";

import { App } from "./apps.model";


@Injectable()
export class AppsService {
  apps: App[] = [];

  constructor(private http: Http) {
  }

  getAppsArray(){
    return this.apps;
  }

  addApp(app: App) {
    const body = JSON.stringify(app);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://deployhandler.com:3000/api/apps' + token, body, {headers: headers})
      .map((response: Response) => {
        const result = response.json();
        const app = new App(
          result.name,
          result.entryPoint,
          result.port,
          result.status,
          result.user,
          result._id
        );
        //this.apps.push(app);
        return app;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  getApps() {
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.get('http://deployhandler.com:3000/api/apps' + token)
      .map((response: Response) => {
        const apps = response.json();
        let localApps: App[] = [];
        for (let app of apps) {
          localApps.push(new App(
            app.name,
            app.entryPoint,
            app.port,
            app.status,
            app.user,
            app._id)
          );
        }
        this.apps = localApps;
        return localApps;
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  editApp(app: App) {
    const body = JSON.stringify(app);
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.put('http://deployhandler.com:3000/api/apps/' + app.appId + token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  deleteApp(app: App) {
    this.apps.splice(this.apps.indexOf(app), 1);
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.delete('http://deployhandler.com:3000/api/apps/' + app.appId + token)
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        return Observable.throw(error.json());
      });
  }

  startApp(appId: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://deployhandler.com:3000/api/apps/' + appId + '/start' + token, '' , {headers: headers})
      .map((response: Response) => {
        response.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }

  stopApp(appId: string) {
    const headers = new Headers({'Content-Type': 'application/json'});
    const token = localStorage.getItem('token')
      ? '?token=' + localStorage.getItem('token')
      : '';
    return this.http.post('http://deployhandler.com:3000/api/apps/' + appId + '/stop' + token, '' , {headers: headers})
      .map((response: Response) => {
        response.json();
      })
      .catch((error: Response) => {
        return Observable.throw(error);
      });
  }
}
