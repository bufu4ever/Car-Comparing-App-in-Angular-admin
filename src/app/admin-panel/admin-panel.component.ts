import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarService, Car } from '../Services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  selectedFile: File | null = null;
  car: Car = {
    manufacturer: '',
    model: '',
    year: 0,
    tireSize: '',
    fuelTankSize: '',
    info: '',
    price: 0,
    imageUrl: ''
  };
  isEditMode: boolean = false;

  constructor(private carService: CarService, private router: Router, private route: ActivatedRoute, private toster: ToastrService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.carService.getCar(params['id']).subscribe(car => {
          this.car = { ...car, id: params['id'] };
        });
      }
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveCar(): void {
    if (this.isEditMode) {
      this.carService.updateCar(this.car, this.selectedFile).subscribe(() => {
        this.toster.success('The Car Have Been Updated...!')
        this.router.navigate(['/dashboard']);
      });
    } else {
      this.carService.addCar(this.car, this.selectedFile).subscribe(() => {
        this.toster.success('New Car Added...!')
        this.router.navigate(['/dashboard']);
      });
    }
  }

  logout(): void {
    this.router.navigate(['']);
    this.toster.success('you are logged out...!');
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
