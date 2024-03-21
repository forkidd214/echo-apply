'use client'

import path from 'path'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

type FormNavProps = {}

export default function FormNav({}: FormNavProps) {
  const pathname = usePathname()
  function getNavPath(route: string) {
    const basePath = pathname.split('/').slice(0, -1).join('/')
    return path.join(basePath, route)
  }

  return (
    <ul className="flex justify-evenly gap-2">
      {NAVS.map((nav) => (
        <li key={nav.key} className="flex-1">
          <NavLink href={getNavPath(nav.route)}>{nav.title}</NavLink>
        </li>
      ))}
    </ul>
  )
}

const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <div className="relative border-b border-b-secondary lg:border-b-0">
      <Button
        asChild
        variant="ghost"
        className={cn(
          'h-9 w-full hover:bg-transparent lg:h-12',
          [
            'before:absolute',
            'before:left-0',
            'before:right-0',
            'before:bottom-0',
            'hover:before:border-b-2',
            'hover:before:border-accent-foreground/40',
          ],
          isActive && 'before:border-b-2 before:border-accent-foreground',
        )}
      >
        <Link href={href}>{children}</Link>
      </Button>
    </div>
  )
}

const NAVS = [
  {
    key: 'create',
    route: '/create',
    title: 'Create',
  },
  {
    key: 'share',
    route: '/share',
    title: 'Share',
  },
  {
    key: 'result',
    route: '/result',
    title: 'Result',
  },
]
