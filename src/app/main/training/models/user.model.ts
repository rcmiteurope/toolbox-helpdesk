export interface TrainingUser {
  id: number;
  name: string;
  email: string;
  role: 'Developer' | 'Designer' | 'Manager';
  status: 'Active' | 'Inactive';
}
