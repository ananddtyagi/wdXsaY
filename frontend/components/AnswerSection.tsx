type Props = {
  answer: string;
  citations: any[];
};

export default function AnswerSection({ answer, citations = [] }: Props) {
  return (
    <div className="box m-5">
      <div className="border rounded border-blue-500 p-5 shadow-lg m-5">
        <h1>Answer</h1>
        <p className="py-5 sm:text-sm">{answer}</p>
      </div>
      <div className="border rounded border-green-500 p-5 m-5">
        <h1>Citations</h1>
        <div>
          {citations
            .filter((citation) => citation["metadata"]["page"] != 1)
            .map((citation) => {
              return (
                <div key={citation["metadata"]["page"]} className="py-4">
                  <p className="sm:text-sm font-bold">
                    Page: {citation["metadata"]["page"]}
                  </p>{" "}
                  <p className="sm:text-sm">{citation["page_content"]}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export { AnswerSection };
