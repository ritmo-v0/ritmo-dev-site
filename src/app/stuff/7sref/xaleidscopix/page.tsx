// Components & UI
import { HR, MarkdownText, P, Section } from "@/components/common/typography";

// Constants & Variables
const TEXT = `
## PHASE.01 - SEISHUN AREA

Sky street, where young talent from all fields of art, sports, and music talent gathers.
Four teams specializing in each talent, commonly known as “Yozora,” have come together to create a unique aspect of the city.
One night, the Sky Hall′s large screen suddenly shone intensely.
Countless butterflies twinkled above the heads of the four, and the mysterious scene disappeared, afterwards they found a strange butterfly-shaped birthmark on their left hands.
The butterflies gave them the power to “Time Leap,” allowing them to go back in time and dramatically change their destinies.

---

## PHASE.02 - KAMISAMA AREA

At the Shirayuri Academy, a school where beautiful angels gather.
There was a girl here named “Yurisaki Mika,” known as the “White Lily Princess,” who was called the Almighty Heavenly Sword.
She existed solely to support this country and knew nothing of the outside world.
Also, at the academy, the knight who protects Mika is chosen through a duel.
However, those chosen as knights eventually fell from grace after battles with demons.
Ruki, known as the fallen angel Lucifer, decided to unite his fellow fallen angels and demons to fight against the heavens.

---

## PHASE.03 - BLACK ROSE AREA

A world where the epidemic called “Black Rose Disease” and incidents caused by demons occur.
Owl, who became the youngest State Alchemist, solves bizarre mysteries by alchemy.
In the intricately intertwined case, the mysteries only deepen with “angels,” “demonization,” and “Azoto.”
This is the story of a detective who, along with their companions, solves various mysteries and requests.

---

## PHASE.04 - SHUMATSU AREA

In a world where humanity has abandoned Earth and fled to space, only robots remain.
Humans discovered the planet Diosa, and constructed colonies as satellite cities, but eventually, humanity perished, leaving behind only the robots they had created.
The robots had been programmed with a special command to return to Earth, and upon their return, they began an invasion as part of the Imperial forces.
Meanwhile, on Earth, which was left with only robots, a city called Metropolis was constructed and unified under the rule of “Kurohime.”

---

## PHASE.05 - HAJIMARI AREA

The area that everyone visits first.
It shows different faces depending on the location.
Travel around to various places, such as pools with large water slides, fizzy hot springs, space stations, and star birth festivals.
Sometimes there are lots of fun things like watching live performances and dance shows.

---

## PHASE.06 - SEKAIJU AREA

This is a world where “dragons and humans” are born as pairs.
Soul partners, even if born in different places, are destined to meet and share their fate for life.
However, a boy named Ask is the only one who not only fails to meet his partner but is also inherently disliked by every dragon he encounters.
This is a story of meeting various companions and embarking on a journey to find his partner dragon.

---

## PHASE.07 - PRISM AREA

A white world with white towers lined up, “7sRef.”
This is the place where all colors return.
Seven doors, seven worlds, seven principles, seven colors.
A place where worlds that are not supposed to intersect refract, change shape, and eventually merge into one.
What this place is and how long it has existed…
“Ris” is the administrator who simply watches over this world.
Let′s go to the mysterious world that connects these seven different worlds, “Sevens Refraction”.

---

## PHASE.08 - “maimai” AREA

Thank you for playing.
`.trim();



export default function XaleidscopiXPage() {
	return (
		<main>
			<header className="mb-6">
				<iframe
					className="w-full aspect-video rounded-xl"
					src="https://www.youtube-nocookie.com/embed/-PTe8zkYt9A"
					title="Xaleid◆scopiX / xi [maimai でらっくす]"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					referrerPolicy="strict-origin-when-cross-origin"
					allowFullScreen
				/>
			</header>
			<Section className="font-sans">
				<P className="text-center">
					All colors eventually return to one plane
				</P>
				<HR className="my-12" />
				<div className="[&_p]:italic">
					<MarkdownText>
						{TEXT}
					</MarkdownText>
				</div>
				<HR className="my-12" />
				<P className="text-center">
					Acid saved Ris who had gone out of control, and crossed the seven doors and worlds.
					<br />Eventually, a rain of jewels began to fall, and each kaleidoscope reflected it.
					<br />Please take a look at the next world and extra track woven by them who have overcome everything.
				</P>
			</Section>
		</main>
	);
}