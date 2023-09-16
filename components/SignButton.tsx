import * as React from "react";
import { signIn, signOut } from "next-auth/react";

export default function SignButton({
  children,
  signin,
}: {
  children: React.ReactNode;
  signin: boolean;
}) {
  return (
    <button
      className="bg-green-500 text-sm sm:text-lg hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
      type="button"
      onClick={signin ? () => signIn() : () => signOut()}
    >
      {children}
    </button>
  );
}
