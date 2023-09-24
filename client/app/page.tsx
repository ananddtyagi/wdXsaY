import Image from 'next/image'

export default function Home() {
  return(
    <main>
      <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <form>
            What did
          <select
            id="source"
            name="source"
            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-10 mx-5 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
          >
            <option>Hello</option>
          </select>          
          say about
          <input
            type="text"
            name="query"
            className="rounded-md border-0 py-1.5 pl-3 pr-10 mx-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id="query"
          >
          </input>
        </form>
      </div>
    </main>
  )
}
