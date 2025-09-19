"use client";
import { useSearchParams } from "next/navigation";
import { use7sRefStore } from "@/lib/store/7sref";

// Components & UI
import { Suspense } from "react";
import { Link, Muted } from "@/components/common/typography";
import { LocaleSelect } from "@/components/main/stuff/7sref/locale-select";
import { MessagesTabsContent } from "@/components/main/stuff/7sref/tab-content";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Types & Interfaces
import { type SevensRefMessage, MESSAGE_TABS } from "@/lib/7sref/types";

// Constants & Variables
import mainMessages from "./messages/main.json";
import charactersMessages from "./messages/characters.json";
import settingsMessages from "./messages/settings.json";
const MAIN_MESSAGES = mainMessages as SevensRefMessage[];
const CHARACTERS_MESSAGES = charactersMessages as SevensRefMessage[];
const SETTINGS_MESSAGES = settingsMessages as SevensRefMessage[];



export default function SevensRefArgPage() {
	return (
		<div className="pb-8 font-sans">
			<Suspense>
				<MessagesTabs />
			</Suspense>
		</div>
	);
}

function MessagesTabs() {
	const { locale } = use7sRefStore();
	const searchParams = useSearchParams();
	const tabParam = searchParams.get("tab");

	const targetTab = MESSAGE_TABS.find(t => t.id === tabParam)?.id ?? MESSAGE_TABS[0].id;
	const activeTab = targetTab ?? MESSAGE_TABS[0].id;

	return (
		<Tabs className="gap-8" defaultValue={activeTab}>
			<div className="sticky top-14 py-2 space-y-2 bg-background z-1">
				<div className="flex items-center gap-2">
					<TabsList className="w-full">
						{MESSAGE_TABS.map(tab => (
							<TabsTrigger key={tab.id} value={tab.id}>
								{tab.name[locale]}
							</TabsTrigger>
						))}
					</TabsList>
					<LocaleSelect className="shrink-0" />
				</div>
				<Muted className="text-right">
					Page Description Credit:{` `}
					<Link href="https://x.com/NOTmoemoemo/status/1943984923129630856">
						萌々も
					</Link>
				</Muted>
			</div>
			<MessagesTabsContent
				value={MESSAGE_TABS[0].id}
				locale={locale}
				messages={MAIN_MESSAGES}
			/>
			<MessagesTabsContent
				value={MESSAGE_TABS[1].id}
				locale={locale}
				messages={CHARACTERS_MESSAGES}
			/>
			<MessagesTabsContent
				value={MESSAGE_TABS[2].id}
				locale={locale}
				messages={SETTINGS_MESSAGES}
			/>
		</Tabs>
	);
}