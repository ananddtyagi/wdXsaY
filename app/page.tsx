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
  const [source, setSource] = useState(searchParams.get("source") ?? "")
  const [question, setQuestion] = useState(searchParams.get("question") ?? "")
  const [insights, setInsights] = useState("")

  const setSourceParam = (newSource: string) => {
    setSource(newSource)
  }

  const setQuestionParam = (newQuestion: string) => {
    setQuestion(newQuestion)
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {

      params.set("source", source)
      params.set("question", question)

      event.preventDefault();
      const response  = await fetch(`api/getInsights/?${params.toString()}`, {
        method: 'GET',
      });

      const result = await response.json();

      setInsights(result.message)
      router.push(pathname + "?" + params.toString())
      console.log(result)

      
  }


  return(
    <main>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <form
            onSubmit={onSubmit}
        >
            What does
          <select
            id="source"
            name="source"
            value={source}
            onChange={(e) => setSourceParam(e.target.value)}
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-10 mx-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            <option value="" disabled hidden>Select an option...</option>
            <option value="clean-code">Clean Code</option>

          </select>          
          say about
          <input
            type="text"
            name="question"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 mx-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="question"
            value={question}
            onChange={(e) => setQuestionParam(e.target.value)}
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
