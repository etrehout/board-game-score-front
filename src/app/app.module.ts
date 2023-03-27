import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardGameListComponent } from './component/board-game-list/board-game-list.component';
import { LoginComponent } from './component/login/login.component';
import { LoginService } from './service/login.service';
import { MyAccountComponent } from './component/my-account/my-account.component';
import { RegisterComponent } from './component/register/register.component';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      withCredentials: true
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    BoardGameListComponent,
    LoginComponent,
    MyAccountComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [
    LoginService, { 
      provide: HTTP_INTERCEPTORS, 
      useClass: XhrInterceptor, 
      multi: true 
      },
    AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
