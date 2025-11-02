const PUBLIC_API_URL = import.meta.env.PUBLIC_ENV_URL as string;

export interface ContactFormData {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export interface ContactResponse {
	success?: boolean;
	error?: string;
	meassge?: string;
}

export async function submitContactForm(data: ContactFormData): Promise<ContactResponse> {
	const response = await fetch(`${PUBLIC_API_URL}/api/contact`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error(result.error || 'Failed to send message');
	}

	return result;
}

export async function getApps() {
	const response = await fetch(`${PUBLIC_API_URL}/apps`);
	return response.json();
}

export async function healthCheck() {
	const response = await fetch(`${PUBLIC_API_URL}/health`);
	return response.json();
}
