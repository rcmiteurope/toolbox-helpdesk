export type TicketStatus = 'Open' | 'In Progress' | 'Resolved' | 'Closed';
export type TicketPriority = 'Low' | 'Medium' | 'Normal' | 'High' | 'Urgent';
export type MessageVisibility = 'public' | 'internal';
export type SubtaskStatus = 'In Progress' | 'Investigating' | 'Done' | 'Pending';
export type TimelineEventType = 'created' | 'assigned' | 'escalated' | 'status-change' | 'attachment';

export interface Customer {
  name: string;
  email: string;
  role: string;
  avatar: string | null;
}

export interface Ticket {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  category: string;
  createdAt: string;
  createdBy: string;
  createdByAvatar?: string;
  assignedTo: string | null;
  customer: Customer;
  collaborators: string[];
  collaboratorAvatars?: string[];
  timeLogged: number;
  tags: string[];
}

export interface Discussion {
  id: string;
  ticketId: string;
  author: string;
  authorRole: string;
  message: string;
  visibility: MessageVisibility;
  createdAt: string;
}

export interface SubtaskStep {
  id: string;
  description: string;
  completedAt: string | null;
  status: 'completed' | 'in-progress' | 'pending';
}

export interface Subtask {
  id: string;
  ticketId: string;
  title: string;
  assignee: string;
  status: SubtaskStatus;
  timer: string | null;
  realTimeActive?: boolean;
  createdAt: string;
  steps: SubtaskStep[];
}

export interface TimelineEvent {
  id: string;
  ticketId: string;
  type: TimelineEventType;
  description: string;
  detail: string;
  createdAt: string;
  icon: string;
}

export interface TicketStats {
  openTickets: number;
  openTicketsChange: number;
  pendingApprovals: number;
  pendingApprovalsChange: number;
  avgResolutionTime: string;
  avgResolutionChange: number;
}
