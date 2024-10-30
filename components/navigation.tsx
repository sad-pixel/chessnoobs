"use client"

import * as React from "react"
import Link from "next/link"
import { LampDesk, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { siteSections } from "@/lib/data"

export default function Navigation() {
  return (
    <header className="h-16 flex items-center justify-between border-b border-amber-200 px-4">
      <Link className="flex items-center" href="/">
        <LampDesk className="h-8 w-8 mr-2 text-amber-700" />
        <span className="text-2xl font-bold text-amber-700">ChessNoobs</span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList className="flex space-x-4 overflow-x-none">
          {siteSections.map((section) => (
            <NavigationMenuItem key={section.title}>
              <NavigationMenuTrigger className="bg-transparent">{section.title}</NavigationMenuTrigger>
              <NavigationMenuContent className="relative">
                <ul className="flex flex-col space-y-2 p-4 md:w-[400px] lg:w-[500px]">
                  {section.features.map((feature) => (
                    <ListItem 
                      key={feature.title} 
                      href={feature.link} 
                      title={feature.title} 
                      icon={feature.icon} 
                      disabled={feature.comingSoon}
                    >
                      {feature.description}
                      {feature.comingSoon && (
                        <span className="ml-2 inline-block bg-amber-200 text-amber-800 text-xs font-semibold px-2 py-1 rounded">
                          Coming Soon
                        </span>
                      )}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button className="text-amber-700 hover:text-amber-900 bg-amber-200 hover:bg-amber-300 flex items-center" asChild>
        <Link href="https://github.com/sad-pixel/chessnoobs">
          <Github className="h-5 w-5 mr-2" />
          GitHub
        </Link>
      </Button>
    </header>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { icon: React.ReactNode, disabled?: boolean }
>(({ className, title, children, icon, disabled, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            disabled ? "cursor-not-allowed opacity-50" : "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
          aria-disabled={disabled}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0">{icon}</div>
            <div className="ml-2">
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
