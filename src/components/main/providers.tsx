// Providers & Context
import { NextIntlClientProvider } from "next-intl";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "next-themes";
import { ShadcnProvider } from "@/lib/theme/provider";

// Components & UI
import { Toaster } from "@/components/ui/sonner";



export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NextIntlClientProvider>
			<NuqsAdapter>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
					scriptProps={{ type: "application/json" }}
				>
					<ShadcnProvider>
						{children}
						<Toaster />
					</ShadcnProvider>
				</ThemeProvider>
			</NuqsAdapter>
		</NextIntlClientProvider>
	);
}