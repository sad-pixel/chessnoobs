"use client"

import * as React from "react"
import { Menu, ChevronDown, ChevronRight, LampDesk } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { cn } from "@/lib/utils"
import { siteSections } from "@/lib/data"

type MenuItem = {
  title: string
  href?: string
  submenu?: MenuItem[]
  icon?: React.ReactNode
  comingSoon?: boolean
}

const transformSiteSectionsToMenuItems = (sections: typeof siteSections): MenuItem[] => {
  return sections.map(section => ({
    title: section.title,
    submenu: section.features
      .filter(feature => !feature.comingSoon) // Filter out items marked as coming soon
      .map(feature => ({
        title: feature.title,
        href: feature.link,
        icon: feature.icon,
        comingSoon: feature.comingSoon
      }))
  }))
}

const menuItems: MenuItem[] = transformSiteSectionsToMenuItems(siteSections)

const MenuItemComponent: React.FC<{ item: MenuItem; depth?: number }> = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = React.useState(false)

  if (item.submenu) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <button
            className={cn(
              "flex w-full items-center justify-between py-2 text-lg font-medium transition-colors hover:text-primary",
              depth > 0 && "pl-4"
            )}
          >
            {item.title}
            {isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {item.submenu.map((subItem) => (
            <MenuItemComponent key={subItem.title} item={subItem} depth={depth + 1} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <a
      href={item.href}
      className={cn(
        "flex items-center py-2 text-lg font-medium transition-colors hover:text-primary",
        depth > 0 && "pl-4",
        item.href === "/" && "text-primary"
      )}
    >
      {item.icon && <span className="inline-flex items-center mr-2 h-5 w-5">{item.icon}</span>}
      <span className="inline-flex items-center">{item.title}</span>
    </a>
  )
}

export default function MobileNav() {
  const [open, setOpen] = React.useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <div className="flex items-center p-4">
          <Button variant="ghost" size="icon" className="md:hidden text-amber-700">
            <Menu className="h-48 w-48 text-amber-700" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          <LampDesk className="h-8 w-8 mr-4 text-amber-700" />
          <span className="text-2xl font-bold text-amber-700">ChessNoobs</span>
        </div>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[300px]">
        <div className="flex items-center mb-4">
        <LampDesk className="h-6 w-6 mr-2 text-amber-700" />
        <span className="text-xl font-bold text-amber-700">ChessNoobs</span>
        </div>
        <nav className="flex flex-col space-y-4">
          {menuItems.map((item) => (
            <MenuItemComponent key={item.title} item={item} />
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}