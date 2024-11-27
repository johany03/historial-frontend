import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RouterModule, Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { ValidationMessageComponent } from '../../../shared/components/validation-message/validation-message.component';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
    selector: 'app-login',
    standalone: true,
    imports: [
      CommonModule,
      ButtonModule,
      CheckboxModule,
      InputTextModule,
      FormsModule,
      PasswordModule,
      RouterModule,
      ReactiveFormsModule,
      MessagesModule,
      ValidationMessageComponent,
      ToastModule
    ],
    templateUrl: './login.component.html',
    providers: [MessageService]

})
export class LoginComponent implements OnInit {

    public loginForm: FormGroup | any = new FormGroup({});


    constructor(public layoutService: LayoutService,
      private authService: AuthService,
      private messageService: MessageService,
      private router: Router,
    ) { }

    ngOnInit() {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.maxLength(100),
          Validators.email,
        ]),
        password: new FormControl(null, Validators.required),
      });
    }

    login(): void {
      if (this.loginForm.invalid) {
        return;
      }
      const data = this.loginForm.value;
      if (this.loginForm.valid) {
        this.authService.login(data.email, data.password).subscribe(
          (res: any) => {
            this.authService.saveToken(res.access_token, "");
            this.router.navigate(['/main']);
          },
          (err: any) => {
            console.error(err); // Para depuración
            const errorMessage =
              err?.error?.error || 'Ocurrió un error inesperado. Inténtalo nuevamente.';
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: errorMessage,
            });
          }
        );
      }
    }


    public hasErrors() {
      return (
        this.loginForm &&
        this.loginForm.errors &&
        (this.loginForm.dirty || this.loginForm.touched)
      );
    }
}
