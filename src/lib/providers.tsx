// Providers & Context
import { ThemeProvider } from "next-themes";
import { ShadcnProvider } from "@/lib/theme/provider";

// Components & UI
import { Toaster } from "@/components/ui/sonner";



export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			disableTransitionOnChange
		>
			<ShadcnProvider>
				<div className="grid grid-rows-[1fr_auto] min-h-svh isolate">
					{children}
					<Toaster />
				</div>
			</ShadcnProvider>
		</ThemeProvider>
	);
}