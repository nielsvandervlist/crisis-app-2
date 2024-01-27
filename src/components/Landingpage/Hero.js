import Button from '@/components/Button'
import Container from '@/components/Landingpage/Container'

export function Hero() {
	return (
		<Container className="pt-16 pb-16 text-center max-w-2xl">
			<h1 className="font-display text-3xl tracking-tight sm:text-4xl md:text-5xl">
                Online crisis management
			</h1>
			<p className="mt-6 text-lg">
                An online training platform meticulously crafted for handling crises within organizations, stands as a beacon of preparation in the midst of uncertainty.
			</p>
			<div className="mt-10 flex justify-center gap-x-6">
				<Button
					className={'flex items-center'}
					href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
				>
					Get 6 months free
				</Button>
			</div>
		</Container>
	)
}
