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
        <div>Processing... It will take some time</div>
        <LoadingIcon/>
      </div>
    )
  } else {
    return(
      <div className="place-items-center">
        <div className="text-center" >Upload a pdf to continue</div>
        <br></br>
        <form className={statusRenderColor()}>
          <input type="file" onChange={uploadFile} accept="application/pdf" />
          <button className="py-1 px-4 border rounded" 
            type="submit" onClick={submit}>Upload</button>
        </form>
      </div>
    )
  }
}