
export function RitmoIcon({ ...props }: React.SVGProps<SVGSVGElement>) {
	return (
		<svg
			key="Ritmo."
			role="img"
			aria-label="Ritmo."
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="square"
			strokeLinejoin="miter"
			{...props}
		>

			<line x1="4" y1="20" x2="4" y2="4" />
			<path d="m4,4h11c2.76,0,5,2.24,5,5c0,2.76-2.24,5-5,5h-6c-2.76,0-5-2.24-5-5v-5Z" />
			<polygon
				fill="currentColor"
				stroke="none"
				points="3 3 5.63 3 21 21 18.37 21 3 3"
			/>
		</svg>
	);
}