export interface Journey {
	id: string;
	city: string;
	days: number;
	keywords: string;
	journey_details: string;
	status: 'pending' | 'proposed' | 'accepted' | 'completed';
	created_at: string;
}

export interface Proposal {
	id: string;
	journey_id: string;
	message: string;
	cost: number;
	status: 'pending' | 'accepted' | 'rejected';
	created_at: string;
}
