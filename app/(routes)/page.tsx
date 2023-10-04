"use client";
export const dynamicParams = true

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { FormEvent } from 'react';

export default function Home() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathname = usePathname()
  const router = useRouter()
  const [source, setSource] = useState(searchParams.get("source") ?? "")
  const [query, setQuery] = useState(searchParams.get("query") ?? "")
  const [answer, setAnswer] = useState("")
  const [citations, setCitations] = useState([])

  const getAnswer = async () => {
    const response = await fetch(`api/getInsights/?${params.toString()}`, {
        method: 'GET',
      });

      const result = await response.json();
      setAnswer(result.answer)
      setCitations(result.source_documents)
      router.push(pathname + "?" + params.toString())
  }

  useEffect(() => {
    getAnswer()
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {

      params.set("source", source)
      params.set("query", query)

      getAnswer()
  }


  return(
    <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <form
          onSubmit={onSubmit}
      >
          What does
        <select
          id="source"
          name="source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-10 mx-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
        >
          <option value="" disabled hidden>Select an option...</option>
          <option value="Clean Code">Clean Code</option>

        </select>          
        say about
        <input
          type="text"
          name="query"
          className="rounded-md border-0 py-1.5 pl-3 pr-10 mx-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          id="query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        >
        </input>
        <input 
          type="submit" 
          value="Let's find out!"
          className="rounded-md ring-1 ring-inset ring-gray-300 px-5 py-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
        >	
        </input>
      </form>
      {answer && 
        <div className="box m-5">

          <div className="border rounded border-blue-500 p-5 shadow-lg m-5">
            <h1>Answer</h1>
            <p className="py-5 sm:text-sm">{answer}</p>

          </div>
          <div className="py-2 border rounded border-green-500 p-5 m-5">
            <h1>Citations</h1>
            <div className="py-5">
            {citations.map((citation) => {
              return (
                  <div key={citation["metadata.page"]} className="py-4">
                  <p>Page: {citation["metadata.page"]}</p>
                  <p>{citation["page_content"]}</p>
                </div>

              )
            })}
            </div>
          </div>
        </div>
      }

    </div>
  )
}
