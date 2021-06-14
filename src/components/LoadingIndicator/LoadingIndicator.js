import React from "react"
import loadingIndicator from "./loading1.gif"

const LoadingIndicator = ({width, height}) => {
  return (
    <div className = "loadingIndicator">
      <img
        src={loadingIndicator}
        alt="loading"
        width={width}
        height={height}
      />
    </div>
  )
}

export default LoadingIndicator;
