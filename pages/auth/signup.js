import React, { useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
const signup = () => {
  const { data: session, status } = useSession( [] );
  console.log(status)

  return (
    <div>
      {session ? (
        <h1>You are Signed in as {session.user.name} </h1>
      ) : (
        <div className='m-auto'>
          <h1>You are nit Signed In </h1>
          <button onClick={signIn} className='h-8 w-20 bg-yellow-400'>
            Sign In
          </button>
        </div>
      )}
    </div>
  );
};

export default signup;
