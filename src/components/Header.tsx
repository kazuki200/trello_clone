import React from "react";
import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Image, { ImageLoaderProps } from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const Header = async () => {
  const session = await getServerSession(authOptions);
  console.log(session?.user?.image);

  return (
    <header className="bg-gray-200 p-4 px-8">
      <div className="flex justify-between items-center">
        <Link href="/" className="logo">
          Trello
        </Link>
        <div>
          {session && (
            <>
              <div className="flex items-center gap-3">
                Hello, {session?.user?.name}
                <Image
                  width={50}
                  height={50}
                  src={session?.user?.image || ""}
                  alt="name"
                  className="rounded-full mr-10"
                />
                <LogoutButton />
              </div>
            </>
          )}
          {!session && (
            <>
              Not logged in
              <LoginButton />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
