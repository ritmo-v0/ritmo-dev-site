// Route Params
export type Params<K extends string> = {
	params: Promise<{
		[Key in K]: string;
	}>;
};

// Component Props
export type AsChild = {
	asChild?: boolean;
};