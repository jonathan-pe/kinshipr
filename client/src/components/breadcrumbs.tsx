import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { isMatch, useMatches } from '@tanstack/react-router'

export default function Breadcrumbs() {
  const matches = useMatches()

  if (matches.some((match) => match.status === 'pending')) return null

  const matchesWithCrumbs = matches.filter((match) => isMatch(match, 'loaderData.crumb'))

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {matchesWithCrumbs.map((match, i) =>
          i + 1 < matchesWithCrumbs.length ? (
            <>
              <BreadcrumbItem className='hidden md:block'>
                <BreadcrumbLink href='#' className='text-foreground'>
                  {match.loaderData?.crumb}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className='hidden md:block' />
            </>
          ) : (
            <BreadcrumbItem key={match.id}>
              <BreadcrumbPage>{match.loaderData?.crumb}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  )
}
