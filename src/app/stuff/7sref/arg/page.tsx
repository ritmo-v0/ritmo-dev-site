"use client";
import { useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";

// Components & UI
import { Suspense } from "react";
import { Link, Muted } from "@/components/common/typography";
import { ShowTranslatedButton } from "@/components/main/stuff/7sref/show-translated-button";
import { MessagesTabsContent } from "@/components/main/stuff/7sref/tab-content";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Constants & Variables
import { MESSAGE_TABS } from "@/lib/7sref/constants";



export default function SevensRefArgPage() {
	return (
		<Suspense>
			<MessagesTabs />
		</Suspense>
	);
}

function MessagesTabs() {
	const locale = useLocale();
	const tabParam = useSearchParams().get("tab");
	const activeTab = MESSAGE_TABS.find(t => t.id === tabParam)?.id ?? MESSAGE_TABS[0].id;

	return (
		<Tabs className="gap-8 font-sans" defaultValue={activeTab}>
			<div className="sticky top-16 mx-auto z-1">
				<TabsList className="shadow-lg">
					{MESSAGE_TABS.map(tab => (
						<TabsTrigger
							key={tab.id}
							value={tab.id}
							aria-label={tab.name[locale]}
						>
							{<tab.icon />}
							<span className="max-xs:hidden">
								{tab.name[locale]}
							</span>
						</TabsTrigger>
					))}
					<ShowTranslatedButton size="icon-sm" />
				</TabsList>
			</div>
			{MESSAGE_TABS.map(tab => (
				<MessagesTabsContent
					key={tab.id}
					value={tab.id}
					messages={tab.messages}
				/>
			))}
			<Muted className="px-3 py-1.5 text-center">
				I also cried after seeing{" "}
				<Link href="https://x.com/NOTmoemoemo/status/1943984923129630856">
					this Tweet
				</Link> by 萌々も
			</Muted>
		</Tabs>
	);
}