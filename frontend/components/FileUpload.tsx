import { useState } from "react"
import { BACKEND_URL } from "@/utils/constants"
import LoadingIcon from "./LoadingIcon"

interface FileUploadProps {
  onSuccessUpload: (filename: string) => void
}

enum Status {
  NONE = 1,
  FAILED,
  PENDING,
  SUCCESS
}

export default function FileUpload({onSuccessUpload} : FileUploadProps) {

  const [file, setFile] = useState<File>()
  const [status, setStatus] = useState<Status>(Status.NONE);

  const uploadFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files : FileList | null = event?.target?.files;
    if(files) {
      setFile(files[0]);
    }
  }

  const submit = (event: any) => {
    event.preventDefault()
    if(file) {
      const formData = new FormData();
      formData.append("file", file);

      const url = `${BACKEND_URL}/api/uploadfile`
      fetch(url, {
        method: "POST",
        body: formData
      }).then((res) => {
        if(res.ok) {
          return res.json()
        }
      }).then((data) => {
        setStatus(Status.SUCCESS)
        if(data?.filename) {
          onSuccessUpload(data.filename)
        }
      }).catch((error) => {
        console.log("Failed")
        setStatus(Status.FAILED)
      });

      setStatus(Status.PENDING)
    } else {
      window.alert("Please upload a pdf first")
    }
  }

  const statusRenderColor = () : string => {
    switch(status) {
      case Status.NONE:
        return "" // No color
      case Status.FAILED:
        return "bg-red-600"
      default:
        return ""
    }
  }

  if(status === Status.SUCCESS) {
    return(
      <div>
      </div>
    )
  } else if(status == Status.PENDING) {
    return (
      <div className="place-items-center">
        <div>Processing... It will take some time.</div>
        <LoadingIcon/>
      </div>
    )
  } else {
    return(
      <div className="place-items-center">
        <div className="max-w-xl">
          <label
              className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor" strokeWidth="2">
                      <path stroke-linecap="round" stroke-linejoin="round"
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="font-medium text-gray-600">
                      Drop files to Attach, or {" "}
                      <span className="text-blue-600 underline">browse</span>
                  </span>
              </span>
              <input type="file" name="file_upload" className="hidden" onChange={uploadFile} accept="application/pdf" />
          </label>
        </div>
        {file ? (<div className="text-center m-10">File {file.name} selected</div>) : ( <div className="text-center m-10">Upload a pdf to continue</div>)}
        {file ? ( <button className="flex justify-center w-full py-1 px-4 border rounded" 
            type="submit" onClick={submit}>Upload</button>) : (<></>)}

      </div>
    )
  }
}