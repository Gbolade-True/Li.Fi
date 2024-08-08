export const handleError = (error: any): { data: undefined; error: any } => {
	if (error instanceof TypeError) {
		// Handle TypeError specifically
		console.error('TypeError:', error.message);
		return { data: undefined, error: 'Invalid token data' };
	} else if (error instanceof SyntaxError) {
		// Handle SyntaxError specifically
		console.error('SyntaxError:', error.message);
		return { data: undefined, error: 'Invalid JSON response' };
	} else {
		// Catch all other errors
		console.error('Error:', error.message);
		return { data: undefined, error: 'An unexpected error occurred' };
	}
};

export const convertInterfaceToObject = <T extends { [key: string]: any }>(arg: T): Record<string, string> => {
	const object: Record<string, string> = {};
	for (const [key, value] of Object.entries(arg)) {
		object[key] = value;
	}

	return object;
};
