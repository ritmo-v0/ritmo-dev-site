import { ThemeProvider } from "next-themes";

// Components & UI
import { Toaster } from "@/components/ui/toaster";



export default function Providers({ children }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			{children}
			<Toaster />
		</ThemeProvider>
	);
}