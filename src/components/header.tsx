"use client";

import { useEffect, useState } from "react";
import { Button, Navbar, NavbarBrand, NavbarContent, NavbarItem, Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { capitalize } from "@nextui-org/shared-utils";
import NextLink from "next/link";
import { CheckIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import Image from "next/image";
import { bestLogo } from "#/assets";

export function Header() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Navbar classNames={{ wrapper: "max-w-[1200px] px-4" }}>
      <NavbarBrand>
        <NextLink href="/" aria-label="base route">
          <Image src={bestLogo as any} alt="best logo" className="h-12 w-auto" />
        </NextLink>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          {isMounted && (
            <Popover placement="bottom-end" isOpen={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger>
                <Button aria-label="theme trigger" isIconOnly radius="full" className="[&_svg]:size-5">
                  {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <MonitorIcon />}
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex w-32 flex-col">
                  {["light", "dark", "system"].map((mode) => (
                    <Button
                      key={mode}
                      variant="light"
                      size="sm"
                      className="justify-between"
                      endContent={mode === theme && <CheckIcon className="size-4" />}
                      onPress={() => {
                        setTheme(mode);
                        setIsOpen(false);
                      }}
                    >
                      {capitalize(mode)}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
