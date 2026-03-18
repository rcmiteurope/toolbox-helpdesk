import { Injectable, signal } from '@angular/core';
import { Ticket } from '../models/ticket.model';
import { BaseApiService } from '../../../_shared/services/api/base-api.service';
import { Observable, tap, catchError, of, throwError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService extends BaseApiService {
  protected readonly baseUrl = 'http://localhost:3000';
  public readonly tickets = signal<Ticket[]>([]);

  getTickets(): Observable<Ticket[]> {
    return this.get<Ticket[]>('tickets').pipe(
      delay(1000),
      tap((tickets) => this.tickets.set(tickets)),
      catchError((error) => {
        console.error('Error fetching tickets:', error);
        this.tickets.set([]);
        return of([]);
      }),
    );
  }

  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    const newTicket = {
      ...ticket,
      id: Math.floor(Math.random() * 1000).toString(),
      status: 'Open' as const,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin', // In a real app, this would come from an AuthService
    };

    return this.post<Ticket>('tickets', newTicket).pipe(
      tap((createdTicket) => {
        this.tickets.update((current) => [...current, createdTicket]);
      }),
      catchError((error) => {
        console.error('Error creating ticket:', error);
        return throwError(() => error);
      }),
    );
  }
}
