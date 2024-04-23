"use client";

import Link from "next/link";
import Image from "next/image";

import LightLogo from "@/public/sm-logo.svg";
import DarkLogo from "@/public/sm-dark-logo.svg";

interface LogoProps {
  handleOnClick?: () => void;
}

export function Logo({ handleOnClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={() => {
        if (handleOnClick) {
          handleOnClick();
        }
      }}
      className="flex items-center max-xl:justify-center max-ms:justify-start w-full"
    >
      <Image
        src={LightLogo}
        alt="Social app logo"
        priority
        style={{ width: "32px", height: "32px" }}
        className="dark:hidden text-primary xl:ml-2 max-ms:ml-2"
      />
      <Image
        src={DarkLogo}
        alt="Social app logo"
        priority
        style={{ width: "32px", height: "32px" }}
        className="hidden dark:block text-primary xl:ml-2 max-ms:ml-2"
      />
    </Link>
  );
}
