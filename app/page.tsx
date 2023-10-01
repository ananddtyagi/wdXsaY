"use client";
export const dynamicParams = true

import { useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FormEvent } from 'react';

export default function Home() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const router = useRouter()
  const [insights, setInsights] = useState("")

  const setSource = (newSource: string) => {
    console.log(newSource)
    params.set("source", newSource)

    router.push(pathname + "?" + params.toString())
  }

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const response  = await fetch('api/getInsights', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      setInsights(result.message)
      console.log(result)

      
  }


  return(
    <main>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <form
            onSubmit={onSubmit}
        >
            What did
          <select
            id="source"
            name="source"
            value={searchParams.get("source") ?? ""}
            onChange={(e) => setSource(e.target.value)}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-10 mx-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            <option value="" disabled hidden>Select an option...</option>
            <option value="clean-code">Clean Code</option>

          </select>          
          say about
          <input
            type="text"
            name="query"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 mx-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="query"
          >
          </input>
          <input 
            type="submit" 
            value="Let's find out!"
            className="rounded-md ring-1 ring-inset ring-gray-300 px-5 py-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
          >	
          </input>
        </form>
        <div>
          {insights}
        </div>
      </div>
    </main>
  )
}
