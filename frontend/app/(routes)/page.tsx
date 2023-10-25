"use client";
export const dynamicParams = true;

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FormEvent } from "react";
import { AnswerSection } from "@/components/AnswerSection";
import FileUpload from "@/components/FileUpload";

export default function Home() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const router = useRouter();
  const [source, setSource] = useState<string>(
    searchParams.get("source") ?? ""
  );
  const [query, setQuery] = useState(searchParams.get("query") ?? "");
  const [answer, setAnswer] = useState("");
  const [citations, setCitations] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clean.Code.A.Handbook.of.Agile.Software.Craftsmanship
  const getAnswer = async () => {
    setLoading(true);

    const devUrl = `http://localhost:8000/api/getInsights/?${params.toString()}`;

    const response = await fetch(devUrl, {
      method: "GET",
    });
    const result = await response.json();
    setLoading(false);
    setAnswer(result.answer);
    setCitations(result.source_documents);
    router.push(pathname + "?" + params.toString());
  };

  useEffect(() => {
    getAnswer();
  }, []);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    params.set("source", source);
    params.set("query", query);
    if (query.length !== 0 && source.length !== 0) {
      getAnswer();
    }
  };

  return (
    <div className="flex flex-col min-h-screen grid place-items-center ">
      <main className="flex-grow grid place-items-center bg-white px-6 py-20 sm:py-32 lg:px-8">
        <FileUpload
          onSuccessUpload={(filename: string) => {
            setSource(filename);
          }}
        />
        <form onSubmit={onSubmit}>
          What does
          {source.length !== 0 ? source : "_______"} say about
          <input
            type="text"
            name="query"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 mx-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <input
            type="submit"
            value="Let's find out!"
            className="rounded-md ring-1 ring-inset ring-gray-300 px-5 py-1 focus:ring-2 focus:ring-inset focus:ring-indigo-600 "
          ></input>
        </form>
        {loading && (
          <div role="status" className="my-10">
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
        {answer && <AnswerSection answer={answer} citations={citations} />}
      </main>

      <footer className="bottom-0">
        <h4 className="text-center">
          Made by{" "}
          <a target="_blank" href="https://anandtyagi.me" className="underline">
            Anand Tyagi
          </a>
        </h4>
        <hr className="my-6 border-gray-200 dark:border-gray-700 lg:my-8" />

        <h2 className="text-center">
          Join the{" "}
          <a
            className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
            target="_blank"
            href="https://docs.google.com/forms/d/e/1FAIpQLSfYXrlVz7nVn_TUEVHuynY_Xy-aCtavuzvTksX4aKFTl0AI9w/viewform?usp=sf_link"
          >
            email list
          </a>{" "}
          for project updates.
        </h2>
      </footer>
    </div>
  );
}
