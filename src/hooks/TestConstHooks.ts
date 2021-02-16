import { useState } from "react"

const testConstHooks = () => {
  const [result] = useState();
  return {
    result: result
  }
}

export default testConstHooks