"use client";
import { useLocale } from "next-intl";
import { use7sRefStore } from "@/lib/store/7sref";
import { match } from "ts-pattern";
import { cn } from "@/lib/utils";

// Components & UI
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/common/markdown";
import { Message, MessageContent, MessageGroup } from "@/components/ui/message";
import { TabsContent } from "@/components/ui/tabs";

// Types & Interfaces
import type { SevensRefMessage } from "@/lib/7sref/types";

// Constants & Variables
const MAIMAI_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQHq5MdZSkseSjTQcCutJRGYVBfAwKMo8h67Xx";
const ACID_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQltdYqm0qy59sg0zPLQXWFarBZVS14jb2e8vf";
const RITMO_AVATAR_URL = "https://3b4o9rg98c.ufs.sh/f/Tv72XolD6hyQrTxR6l8TJnrEBNZlzcimWfebRjxC0t9DwYS5";



export function MessagesTabsContent({
	value,
	messages
}: { value: string; messages: SevensRefMessage[] }) {
	return (
		<TabsContent value={value}>
			<MessageGroup>
				{messages.map((message, index) => (
					<SRMessage
						id={String(index + 1)}
						key={index}
						message={message}
						showAvatar={message.role !== messages[index - 1]?.role}
					/>
				))}
			</MessageGroup>
		</TabsContent>
	);
}

function SRMessage({
	message,
	...props
}: React.ComponentProps<typeof Message> & { message: SevensRefMessage }) {
	const locale = useLocale();
	const showTranslated = use7sRefStore(state => state.showTranslated);

	const content = message.content[locale]?.trim() && showTranslated
		? message.content[locale]
		: message.content.ja;
	const matches = [...content.matchAll(/\[([^\]]+)\]/g)].map(m => m[1]);  // [...][...][...]
	const isOption = matches.length > 0 && content.startsWith("[") && content.endsWith("]");

	return (
		<Message
			role={message.role}
			className="scroll-mt-10"
			side={message.role !== "player" ? "left" : "right"}
			avatarSrc={match(message.role)
				.with("maimai", () => MAIMAI_AVATAR_URL)
				.with("player", () => RITMO_AVATAR_URL)
				.with("acid", () => ACID_AVATAR_URL)
				.exhaustive()
			}
			avatarFallback={message.role.charAt(0).toUpperCase()}
			keepAvatarSpace
			{...props}
		>
			{isOption ? (
				<div className="flex flex-wrap items-center gap-4 py-10 overflow-hidden">
					{matches.map(match => (
						<Button
							key={match}
							type="button"
							variant="7sref"
							className={cn("h-auto", match.includes("\n")
								? "shrink inline-block whitespace-normal"
								: "xs:min-w-60")}
						>
							<Markdown>{match}</Markdown>
						</Button>
					))}
				</div>
			) : (
				<MessageContent
					variant="bubble"
					className={cn(
						"@2xl/message-group:max-w-3/4",
						message.role === "player" && "bg-primary text-primary-foreground",
					)}
				>
					<Markdown>{content}</Markdown>
				</MessageContent>
			)}
		</Message>
	);
}