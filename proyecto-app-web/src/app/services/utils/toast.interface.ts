export interface Toast {
	type?: 'bg-success' | 'bg-danger' | 'bg-warning';
	delay?: number;
	message?: string;
}