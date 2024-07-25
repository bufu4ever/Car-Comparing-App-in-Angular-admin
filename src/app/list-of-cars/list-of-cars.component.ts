import { Component, OnInit } from '@angular/core';
import { CarService, Car } from '../Services/car.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-of-cars',
  templateUrl: './list-of-cars.component.html',
  styleUrls: ['./list-of-cars.component.css']
})
export class ListOfCarsComponent implements OnInit {
  cars: Car[] = [];

  constructor(private carService: CarService,private router: Router,private toster: ToastrService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe(data => {
      this.cars = data;
    });
  }

  updateCar(car: Car): void {
    this.router.navigate(['/admin', car.id]);
  }

  deleteCar(car: Car): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carService.deleteCar(car.id, car.imageUrl).then(() => {
        this.toster.success('the car have been deleted');
        this.cars = this.cars.filter(c => c.id !== car.id);
      });
    }
    
  }
  goBack(): void {
    this.router.navigate(['/dashboard']);
  }
}
