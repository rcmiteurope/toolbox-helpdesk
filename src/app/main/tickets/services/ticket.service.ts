import { Injectable, signal } from '@angular/core';
import { Ticket, TicketStats, Discussion, TimelineEvent, Subtask } from '../models/ticket.model';
import { BaseApiService } from '../../../_shared/services/api/base-api.service';
import { Observable, tap, catchError, of, throwError, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TicketService extends BaseApiService {
  protected readonly baseUrl = 'http://localhost:3000';
  public readonly tickets = signal<Ticket[]>([]);
  public readonly stats = signal<TicketStats | null>(null);
  public readonly selectedTicket = signal<Ticket | null>(null);

  getTickets(): Observable<Ticket[]> {
    return this.get<Ticket[]>('tickets').pipe(
      delay(500),
      tap((tickets) => this.tickets.set(tickets)),
      catchError((error) => {
        console.error('Error fetching tickets:', error);
        this.tickets.set([]);
        return of([]);
      }),
    );
  }

  getTicketById(id: string): Observable<Ticket> {
    return this.get<Ticket>(`tickets/${id}`).pipe(
      tap((ticket) => this.selectedTicket.set(ticket)),
      catchError((error) => {
        console.error('Error fetching ticket:', error);
        return throwError(() => error);
      }),
    );
  }

  getStats(): Observable<TicketStats> {
    return this.get<TicketStats>('stats').pipe(
      tap((stats) => this.stats.set(stats)),
      catchError((error) => {
        console.error('Error fetching stats:', error);
        return of({
          openTickets: 0,
          openTicketsChange: 0,
          pendingApprovals: 0,
          pendingApprovalsChange: 0,
          avgResolutionTime: '0',
          avgResolutionChange: 0,
        });
      }),
    );
  }

  getDiscussions(ticketId: string): Observable<Discussion[]> {
    return this.get<Discussion[]>(`discussions?ticketId=${ticketId}`).pipe(
      catchError((error) => {
        console.error('Error fetching discussions:', error);
        return of([]);
      }),
    );
  }

  getTimeline(ticketId: string): Observable<TimelineEvent[]> {
    return this.get<TimelineEvent[]>(`activityTimeline?ticketId=${ticketId}`).pipe(
      catchError((error) => {
        console.error('Error fetching timeline:', error);
        return of([]);
      }),
    );
  }

  getSubtasks(ticketId: string): Observable<Subtask[]> {
    return this.get<Subtask[]>(`subtasks?ticketId=${ticketId}`).pipe(
      catchError((error) => {
        console.error('Error fetching subtasks:', error);
        return of([]);
      }),
    );
  }

  createTicket(ticket: Partial<Ticket>): Observable<Ticket> {
    const newTicket = {
      ...ticket,
      id: Math.floor(Math.random() * 10000).toString(),
      ticketNumber: `TK-${Math.floor(Math.random() * 10000)}`,
      status: 'Open' as const,
      createdAt: new Date().toISOString(),
      createdBy: 'Admin',
      assignedTo: null,
      customer: { name: 'Admin', email: 'admin@company.com', role: 'Admin', avatar: null },
      collaborators: [],
      timeLogged: 0,
      tags: [],
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

  selectTicket(ticket: Ticket | null): void {
    this.selectedTicket.set(ticket);
  }
}
