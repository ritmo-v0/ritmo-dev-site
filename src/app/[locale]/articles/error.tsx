"use client";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Components & UI
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/common/typography";

// Icons & Images
import { ArrowClockwiseIcon, ArrowUUpLeftIcon } from "@phosphor-icons/react";

// Types & Interfaces
import type { ErrorInfo } from "next/error";



export default function ArticlesError({ unstable_retry }: ErrorInfo) {
	const router = useRouter();
	const t = useTranslations("articles.error");

	return (
		<div className="grid justify-items-center content-center gap-y-8">
			<div className="w-full aspect-2/1">
				{/* // TODO: Add error illustration */}
			</div>
			<H1>
				<span>―　</span>
				<span className="uppercase italic">{t("title")}</span>
				<span>　―</span>
			</H1>
			<div className="flex items-center gap-4 justify-between w-full">
				<Button size="lg" onClick={router.back}>
					<ArrowUUpLeftIcon data-icon="inline-start" />
					{t("back")}
				</Button>
				<Button size="lg" onClick={unstable_retry}>
					{t("retry")}
					<ArrowClockwiseIcon data-icon="inline-end" />
				</Button>
			</div>
		</div>
	);
}