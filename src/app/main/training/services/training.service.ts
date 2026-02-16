import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';
import { TrainingUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TrainingService {
  private mockUsers: TrainingUser[] = [
    { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Developer', status: 'Active' },
    { id: 2, name: 'Bob Johnson', email: 'bob@example.com', role: 'Designer', status: 'Active' },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'Manager',
      status: 'Inactive',
    },
  ];

  getUsers(): Observable<TrainingUser[]> {
    return of([...this.mockUsers]).pipe(delay(1000));
  }

  saveUser(user: Partial<TrainingUser>): Observable<TrainingUser> {
    const newUser: TrainingUser = {
      ...user,
      id: Math.floor(Math.random() * 1000),
      status: 'Active',
    } as TrainingUser;

    // In a real app, we might push to our local array too,
    // but here we just simulate the API response.
    return of(newUser).pipe(delay(1500));
  }
}
