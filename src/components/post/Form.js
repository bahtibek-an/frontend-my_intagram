import { useState } from "react"


const Form = ({user, userid, publ, addComment, dark}) => {

    const [comment, setComment] = useState("")

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            addComment(user, userid, publ, comment)
            setComment("")
          }}>
            <input type="text" placeholder='Add a comment...'
              onChange={(e) => setComment(e.target.value)}
              value={comment}
              style={{ color: dark ? "#fff" : "#000" }}
            />
          </form>
    )
}

export default Form