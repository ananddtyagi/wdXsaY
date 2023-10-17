
type Props = {
    answer: string;
    citations: [{metadata: {page: string}, page_content: string}];
}

export default function AnswerSection({answer, citations}: Props) {

    if(answer) {
     return (
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
        )
    } else {
        return (
            <div className="my-5">Loading your response</div>
        )
    }
}

export { AnswerSection }