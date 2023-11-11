"use client";
export const dynamicParams = true;

import { useState, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { FormEvent } from "react";
import { AnswerSection } from "@/components/AnswerSection";
import { BACKEND_URL } from "@/utils/constants";
import LoadingIcon from "@/components/LoadingIcon";
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

  const getAnswer = async () => {
    setLoading(true);

    // Change this
    const backendUrl = `${BACKEND_URL}/api/getInsights/?${params.toString()}`;

    const response = await fetch(backendUrl, {
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
    event.preventDefault()
    params.set("source", source);
    params.set("query", query);
    if (query.length !== 0 && source.length !== 0) {
      getAnswer();
    }
  };

  return (
    <div className="flex flex-col min-h-screen grid place-items-center ">
      <main className="flex-grow grid place-items-center bg-white px-6 py-20 sm:py-32 lg:px-8">
        {
          source.length === 0 ?
            (
              <FileUpload
                onSuccessUpload={(filename: string) => {
                  setSource(filename);
                }}
              />
            )
            :
            (
              <>
              <form onSubmit={onSubmit}>
                What does&nbsp;
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
                {loading && <LoadingIcon />}
                {answer && <AnswerSection answer={answer} citations={citations} />}
                </>
            )

        }

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
