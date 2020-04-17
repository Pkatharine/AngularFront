﻿import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
// const usersjson = require("./users.json");

import { User } from '@app/_models';

// var jsonData = JSON.parse(fs.readFileSync("users.json"));

var users: User[] = [{ id: 1, username: 'admin', password: 'admin', firstName: 'Admin', lastName: 'Admin', role: 'admin' }, 
{id:2, username: 'teacher', password: 'teacher', firstName: 'Teacher', lastName: 'Teacher', role: 'teacher'},
{id:3, username: 'student', password:'student', firstName: 'Student', lastName: 'Student', role: 'student'}];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                case url.endsWith('/users') && method === 'POST':
                        return register();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            const { username, password } = body;
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                token: 'fake-jwt-token'
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(users);
        }

        // helper functions
        function register(){
            // get new user object from post body
            let newUser = {'id':users.length + 1 , ...request.body};
            console.log("newuser", newUser)

            // validation
            let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
            if (duplicateUser) {
                return Observable.throw('Username "' + newUser.username + '" is already taken');
            }

            // save new user
            // newUser.id = usersjson.users.length + 1;
            users.push(newUser);
            console.log(users);
            localStorage.setItem('users', JSON.stringify(users));
            console.log(localStorage)

            // respond 200 OK
            return of(new HttpResponse({ status: 200 }));
        }


        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === 'Bearer fake-jwt-token';
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};