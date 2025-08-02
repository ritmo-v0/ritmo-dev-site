// Providers & Context
import { ThemeProvider } from "next-themes";
import { ShadcnProvider } from "@/lib/theme/provider";

// Components & UI
import { Toaster } from "@/components/ui/sonner";



export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ShadcnProvider>
				{children}
				<Toaster />
			</ShadcnProvider>
		</ThemeProvider>
	);
}