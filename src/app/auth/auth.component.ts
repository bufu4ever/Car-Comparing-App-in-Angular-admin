import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';  
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService,private router: Router,private toastr: ToastrService) { }
  
  ngOnInit(): void {
  }
  onSubmit(formData: any) {
    if (!formData.email || !formData.password) {
      console.error('Form Data is incomplete');
      return;
    }
    this.authService.login(formData.email, formData.password).then(() => {
      this.toastr.success('Logged in successfully');
      this.router.navigate(['/dashboard']);
    }).catch(error => {
      this.toastr.error('Login failed', 'Error');
      console.error('Login failed:', error);
    });
  }

}
