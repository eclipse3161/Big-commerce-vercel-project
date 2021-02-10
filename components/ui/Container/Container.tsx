import cn from 'classnames'
import React, { FC } from 'react'

interface Props {
  className?: string
  children?: any
  el?: HTMLElement
  clean?: boolean
}

const Container: FC<Props> = ({ children, className, el = 'div', clean }) => {
  const rootClassName = cn(
    {
      'mx-auto max-w-8xl px-5': !clean,
    },
    className
  )

  let Component: React.ComponentType<
    React.HTMLAttributes<HTMLDivElement>
  > = el as any

  return (
    <Component
      className={rootClassName}
      // style={{ maxWidth: '85rem' }}
    >
      {children}
    </Component>
  )
}

export default Container
