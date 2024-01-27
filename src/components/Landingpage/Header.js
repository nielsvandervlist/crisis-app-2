import React from 'react'
import Link from 'next/link'
import Container from '@/components/Landingpage/Container'
import Button from '@/components/Button'
import Image from 'next/image'

export function Header() {
	return (
		<header className="bg-white" data-cy={'header'}>
			<Container>
				<nav className="relative z-50 flex justify-between">
					<div className="flex items-center md:gap-x-12">
						<Link href="#" aria-label="Home">
							<Image alt={'john'} src={'/images/logo.svg'} width={'220'} height={'125'}/>
						</Link>
					</div>
					<div className="flex items-center gap-x-5 md:gap-x-8">
						<div className="hidden md:block">
							<Link href={`/login`}>Sign in</Link>
						</div>
                        <Button>
						<Link href={`/register`} color="blue">
							<span>
								Get started <span className="hidden lg:inline">today</span>
							</span>
						</Link>
                        </Button>
						<div className="-mr-1 md:hidden">
                            {/*Mobile menu*/}
						</div>
					</div>
				</nav>
			</Container>
		</header>
	)
}
