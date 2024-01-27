import clsx from 'clsx'
import { Buttons } from 'managedat-components'
import { Container } from 'src/components/Container'

type CheckIconProps = {
	className?: string
}

function CheckIcon({ className }: CheckIconProps) {
	return (
		<svg
			aria-hidden="true"
			className={clsx('h-6 w-6 flex-none fill-current stroke-current', className)}
		>
			<path
				d="M9.307 12.248a.75.75 0 1 0-1.114 1.004l1.114-1.004ZM11 15.25l-.557.502a.75.75 0 0 0 1.15-.043L11 15.25Zm4.844-5.041a.75.75 0 0 0-1.188-.918l1.188.918Zm-7.651 3.043 2.25 2.5 1.114-1.004-2.25-2.5-1.114 1.004Zm3.4 2.457 4.25-5.5-1.187-.918-4.25 5.5 1.188.918Z"
				strokeWidth={0}
			/>
			<circle
				cx={12}
				cy={12}
				r={8.25}
				fill="none"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	)
}

type PlanProps = {
	name: string
	price: string
	description: string
	href: string
	features: Array<string>
	featured?: boolean
}

function Plan({ name, price, description, href, features, featured = false }: PlanProps) {
	return (
		<section
			className={clsx(
				'border-border flex flex-col rounded-lg border px-6 sm:px-8',
				featured ? 'from-primary-400 to-primary-500 bg-gradient-to-b py-8 lg:order-none' : 'lg:py-8'
			)}
		>
			<p
				className={`text-xxl font-medium font-light ${
					featured ? 'text-white' : 'text-primary-400'
				}`}
			>
				{price}
			</p>
			<h3 className={`mt-5 text-lg ${featured ? 'text-white' : 'text-primary-400'}`}>{name}</h3>
			<p className={clsx('mt-2 text-base', featured ? 'text-white' : 'text-slate-400')}>
				{description}
			</p>
			<ul
				role="list"
				className={clsx(
					'mt-10 mb-10 flex flex-col gap-y-3 text-sm',
					featured ? 'text-white' : 'text-slate-200'
				)}
			>
				{features.map((feature: string) => (
					<li key={feature} className="flex">
						<CheckIcon className={featured ? 'text-white' : 'text-primary-400'} />
						<span className={`ml-4 ${featured ? 'text-white' : 'text-primary-400'}`}>
							{feature}
						</span>
					</li>
				))}
			</ul>
			<Buttons.Button
				href={href}
				variant={featured ? 'secondary' : 'primary'}
				color="white"
				className="mt-auto text-center"
				aria-label={`Get started with the ${name} plan for ${price}`}
			>
				Get started
			</Buttons.Button>
		</section>
	)
}

export function Pricing() {
	return (
		<section id="pricing" aria-label="Pricing" className="bg-white py-20 sm:py-32">
			<Container>
				<div className="md:text-center">
					<h2 className="font-display text-primary-400 text-3xl tracking-tight sm:text-4xl">
						<span className="relative whitespace-nowrap">
							<span className="relative">Simple pricing,</span>
						</span>{' '}
						for everyone.
					</h2>
					<p className="mt-4 text-lg text-slate-400">
						It doesn’t matter what size your business is, our software won’t work well for you.
					</p>
				</div>
				<div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
					<Plan
						name="Starter"
						price="$9"
						description="Good for anyone who is self-employed and just getting started."
						href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
						features={[
							'Send 10 quotes and invoices',
							'Connect up to 2 bank accounts',
							'Track up to 15 expenses per month',
							'Manual payroll support',
							'Export up to 3 reports',
						]}
					/>
					<Plan
						featured
						name="Small business"
						price="$15"
						description="Perfect for small / medium sized businesses."
						href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
						features={[
							'Send 25 quotes and invoices',
							'Connect up to 5 bank accounts',
							'Track up to 50 expenses per month',
							'Automated payroll support',
							'Export up to 12 reports',
							'Bulk reconcile transactions',
							'Track in multiple currencies',
						]}
					/>
					<Plan
						name="Enterprise"
						price="$39"
						description="For even the biggest enterprise companies."
						href={`${process.env.NEXT_PUBLIC_APP_URL}/register`}
						features={[
							'Send unlimited quotes and invoices',
							'Connect up to 15 bank accounts',
							'Track up to 200 expenses per month',
							'Automated payroll support',
							'Export up to 25 reports, including TPS',
						]}
					/>
				</div>
			</Container>
		</section>
	)
}
