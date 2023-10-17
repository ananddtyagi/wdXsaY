import { useState } from "react"

interface FileUploadProps {
  onSuccessUpload: (filename: string) => void
}

enum Status {
  NONE = 1,
  FAILED,
  SUCCESS
}

const prod_url = `https://wdxsay-c04518d7a124.herokuapp.com/`
const dev_url = `http://localhost:8000`

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

      const url = `${dev_url}/api/uploadfile`
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
      })
    }
  }

  const statusRenderColor = () : string => {
    switch(status) {
      case Status.NONE:
        return "" // No color
      case Status.FAILED:
        return "bg-red-600"
      case Status.SUCCESS:
        return "bg-green-500 "
      default:
        return "bg-red-600"
    }
  }

  if(status === Status.SUCCESS) {
    return(
      <div>
      </div>
    )
  } else {
    return(
      <div className={statusRenderColor()}>
          <form>
            <input type="file" onChange={uploadFile} accept="application/pdf" />
            <button type="submit" onClick={submit}>Upload</button>
          </form>
      </div>
    )
  }
}