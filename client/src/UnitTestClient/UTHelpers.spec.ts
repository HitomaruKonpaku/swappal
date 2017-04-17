import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod, XHRBackend, RequestOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe("Test _Guards",function(){
    it('Fake-backend - setTimeout (get user)',function(){
        var setTimeout = function(connection:any,users:any){
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: users })));
                }
                else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }
        }
        expect(setTimeout).toThrow();
    })
    it('Fake-backend - setTimeout (get user by id)',function(){
        var setTimeout = function(connection:any,user:any){
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Get) {
                if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: user })));
                } 
                else {
                    connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                }
                return;
            }
        }
        expect(setTimeout).toThrow();
    })
    it('Fake-backend - setTimeout (create user)',function(){
        var setTimeout = function(connection:any,users:any){
            if (connection.request.url.endsWith('/api/users') && connection.request.method === RequestMethod.Post) {
                    // get new user object from post body
                    let newUser = JSON.parse(connection.request.getBody());
                    // validation
                    let duplicateUser = users.filter.length;
                    if (duplicateUser) {
                        return connection.mockError(new Error('Username "' + newUser.username + '" is already taken'));
                    }
                    // save new user
                    newUser.id = users.length + 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));
                    // respond 200 OK
                    connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    return;
                }
        }
        expect(setTimeout).toThrow();
    })
    it('Fake-backend - setTimeout (delete user)',function(){
        var setTimeout = function(connection:any,users:any){
            if (connection.request.url.match(/\/api\/users\/\d+$/) && connection.request.method === RequestMethod.Delete) {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (connection.request.headers.get('Authorization') === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = connection.request.url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }
                        // respond 200 OK
                        connection.mockRespond(new Response(new ResponseOptions({ status: 200 })));
                    } else {
                        // return 401 not authorised if token is null or invalid
                        connection.mockRespond(new Response(new ResponseOptions({ status: 401 })));
                    }
                    return;
                }
        }
        expect(setTimeout).toThrow();
    })
});